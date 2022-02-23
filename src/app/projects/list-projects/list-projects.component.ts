import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../util/web3.service';
import Web3 from 'web3';
import { Router } from '@angular/router';
import { DataService } from "../../core/services/data.service";


declare let require: any;
const project_artifacts = require('../../../../build/contracts/Project.json');
const crowdfunding_artifacts = require('../../../../build/contracts/Crowdfunding.json');
import { MatDialog } from '@angular/material/dialog';
import { InvestmentContractDialogComponent } from '../../investment-contract-dialog/investment-contract-dialog.component';
import { InvestmentDialogComponent } from '../../investment-dialog/investment-dialog.component';
import { TokenaAddressService } from '../../core/services/hashMap.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.css']
})
export class ListProjectsComponent implements OnInit {

  projectName = ''
  projectDescription = ''
  duration = 0;
  goal = 0;

  crowdData: any;
  accounts: string[];
  account: string;
  projectContractList = [];
  projectData = [];
  projectContract: any;
  projectAddresses = [];

  constructor(private data: DataService, private web3Service: Web3Service, private route: Router, public dialog: MatDialog,
    private projectLender: TokenaAddressService,
    private auth: AuthService) {

  }

  ngOnInit() {
    this.watchAccount();
    this.web3Service.artifactsToContract(crowdfunding_artifacts)
      .then((CrowdfundingAbstraction) => {
        this.crowdData = CrowdfundingAbstraction;
        this.marketplace();
      });
  }

  async marketplace() {
    var now = new Date().getTime();
    var timeleft;
    console.log('Get projects!');

    const deployedCrowdContract = await this.crowdData.deployed();
    deployedCrowdContract.returnAllProjects().then((projects) => {
      this.web3Service.artifactsToContract(project_artifacts)
        .then((ProjectAbstraction) => {
          console.log('projects..:', projects.length);
          this.projectContractList = projects
          projects.forEach((projectAddress) => {
            this.projectAddresses.push(projectAddress);
            ProjectAbstraction.at(projectAddress).then((data) => {
              console.log('data....:', data)
              console.log(this.auth.instantUser.ethAddress)
              console.log(data.address)
              data.getDetailsLender()
                .then((res) => {
                  console.log('res.state.:', res.currentState.toString());
                  res.goalAmount = Web3.utils.fromWei(res.goalAmount, 'ether'),
                    res.currentAmount = Web3.utils.fromWei(res.currentAmount, 'ether'),
                    console.log('res.goalAmount.:', res.goalAmount),
                    console.log('res.currentAmount.:', res.currentAmount),
                    res.raised = (res.currentAmount * 100) / res.goalAmount,
                    timeleft = (new Date(res.deadline * 1000)).getTime() - now,
                    res.day = Math.floor(timeleft / (1000 * 60 * 60 * 24));
                  res.hour = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                  res.minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
                  res.deadline = (new Date(res.deadline * 1000)).getDate(),
                    res.state = res.currentState.toString(),
                    res.status = res.currentStatus.toString(),
                    res.sentToOwner = res.goalAmount - res.currentAmount,
                    this.projectData.push(res);
                  this.projectLender.setPHashMap(projectAddress, res.currentAmount)
                });
            });
          });
          this.data.setAddresses(this.projectAddresses);
        });

    });

  }


  openDialog(data: any, index) {
    const dialogRef = this.dialog.open(InvestmentContractDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        const dialogRef = this.dialog.open(InvestmentDialogComponent, {
          width: '250px',
          backdropClass: 'custom-dialog-backdrop-class',
          panelClass: 'custom-dialog-panel-class',
          data: { projectTitle: data.projectTitle }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.fundProject(data, result.data, index)
          }
          console.log('data received...:', result.data);

        });
      }
    });
  }

  async fundProject(data, amount, index) {
    // Operations for funding an existing crowdfunding project will be here!
    console.log('Fund project!');
    if (!amount) {
      return;
    }

    console.log('account..:', this.account)
    console.log('this.projectContractList...:', this.projectContractList)
    const projectContract = this.projectContractList[index];
    console.log('projectContract..:', projectContract)
    this.web3Service.artifactsToContract(project_artifacts)
      .then((ProjectAbstraction) => {
        ProjectAbstraction.at(projectContract).then((data) => {
          data.contribute({
            from: this.auth.instantUser.ethAddress,
            value: Web3.utils.toWei(amount, 'ether'),
          }).then((res) => {
            console.log('res, event ...:', res)
            // console.log(data.address)
            // this.projectLender.setHashMap(this.auth.instantUser.ethAddress, data.address)
          });   
        });
      })
  }

  async chosenProjects() {
    console.log(this.projectLender.getHashMap(this.auth.instantUser.ethAddress))

    const deployedCrowdContract = await this.crowdData.deployed();
    deployedCrowdContract.returnAllProjects().then((projects) => {
      this.web3Service.artifactsToContract(project_artifacts)
        .then((ProjectAbstraction) => {
          console.log(this.projectLender.getHashMap(this.auth.instantUser.ethAddress))
          this.projectLender.getHashMap(this.auth.instantUser.ethAddress).forEach((projectAddress) => {
            ProjectAbstraction.at(projectAddress).then((data) => {
              console.log('data....:', data)
              console.log(this.auth.instantUser.ethAddress)
              console.log(data.address)
              data.getDetailsLender({ from: this.auth.instantUser.ethAddress })
                .then((res) => {
                  console.log('res.state.:', res.currentState.toString());
                  res.goalAmount = Web3.utils.fromWei(res.goalAmount, 'ether'),
                    res.currentAmount = Web3.utils.fromWei(res.currentAmount, 'ether'),
                    console.log('res.goalAmount.:', res.goalAmount),
                    console.log('res.currentAmount.:', res.currentAmount),
                    res.raised = (res.currentAmount * 100) / res.goalAmount,
                    res.deadline = (new Date(res.deadline * 1000)).getDate(),
                    res.state = res.currentState.toString(),
                    res.status = res.currentStatus.toString(),
                    res.sentToOwner = res.goalAmount - res.currentAmount;
                });
            });
          });
        });

    });
  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.account = accounts[0];
      console.log('account[0]..:', this.account)

    });
  }


}