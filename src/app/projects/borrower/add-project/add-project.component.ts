import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Web3Service } from '../../../util/web3.service';
import { FileValidator } from 'ngx-material-file-input';
import { AuthService } from '../../../core/services/auth.service';
import { TokenaAddressService } from '../../../core/services/hashMap.service';


declare let require: any;
const crowdfunding_artifacts = require('../../../../../build/contracts/Crowdfunding.json');
const Web3 = require('web3');
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  addActionForm: FormGroup;
  projectName: string;
  projectDescription = '';
  duration = 0;
  goal = '0';
  _goal = 0;
  requiredfile: any;
  buyerAddress: string;
  interest = 0;
  crowdData: any;
  accounts: string[];
  account: string;
  projectData: any;
  firstAcc: string;
  projectContract: any;
  readonly maxSize = 1024;
  hash: string;
  loading = false;

  constructor(private web3Service: Web3Service,
    public auth: AuthService) { }

  async ngOnInit() {
    this.addActionForm = new FormGroup({
      projectName: new FormControl('', Validators.required),
      projectDescription: new FormControl('', Validators.required),
      duration: new FormControl(this.duration, Validators.required),
      goal: new FormControl(this.goal, Validators.required),
      buyerAddress: new FormControl(this.buyerAddress, Validators.required),
      interestRate: new FormControl(this.buyerAddress, Validators.required),
      requiredfile: new FormControl(
        '',
        [Validators.required, FileValidator.maxContentSize(this.maxSize)]
      )
    });
  };

  async addProject() {
    console.log('inside addproject..:')
    console.log('addresss', this.auth.instantUser.ethAddress)
    this._goal = (this.addActionForm.value.goal)*10000;
    this.loading = true;
    try {
      this.web3Service.artifactsToContract(crowdfunding_artifacts)
        .then((CrowdfundingAbstraction) => {
          this.crowdData = CrowdfundingAbstraction;
          CrowdfundingAbstraction.deployed().then(deployed => {
            console.log('deployed..:', deployed);
            console.log('addActionForm..:', this.addActionForm.value);
            deployed.startProject(
              this.addActionForm.value.projectName,
              this.addActionForm.value.buyerAddress,
              (this.addActionForm.value.interestRate)*10000,
              this.addActionForm.value.projectDescription,
              this.addActionForm.value.duration,
              Web3.utils.toWei(this._goal.toString(), 'ether'),
              this.hash,
              { from: this.auth.instantUser.ethAddress }
            ).then((res) => {
              console.log('added project')
              console.log(res)
              this.loading = false;
            }, error => {
              console.log('erroorrr...', error)
              this.loading = false;
            })
          });
        });
    } catch {
      this.loading = false;
    }

  }


  submit(): void {
    let buffer: any;

    const file = this.addActionForm.get('requiredfile').value.files[0];
    const reader = new (window as any).FileReader();
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      buffer = Buffer.from(reader.result)
      this.hash = ipfs.add(buffer, (error, result) => {
        console.log('hash..:', result[0].hash)
        this.hash = result[0].hash
        this.addProject();
        console.log('after calling this.addproject..:')
        if (error) {
          console.log('Error in adding the image to the IPFS')
        }
      })
    }
  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.account = accounts[0];
      console.log('account[0]..:', this.account)

    });
  }
}