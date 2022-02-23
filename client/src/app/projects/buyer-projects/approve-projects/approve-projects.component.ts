import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../../util/web3.service';
import Web3 from 'web3';
import { Router } from '@angular/router';
import { DataService } from "../../../core/services/data.service";


declare let require: any;
const project_artifacts = require('../../../../../build/contracts/Project.json');
const crowdfunding_artifacts = require('../../../../../build/contracts/Crowdfunding.json');
import { MatDialog } from '@angular/material/dialog';
import { TokenaAddressService } from '../../../core/services/hashMap.service';
import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-approve-projects',
  templateUrl: './approve-projects.component.html',
  styleUrls: ['./approve-projects.component.css']
})
export class ApproveProjectsComponent implements OnInit {

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
    private tokenAddress: TokenaAddressService,
    private auth: AuthService) {

  }

  ngOnInit() {
    this.watchAccount();
    this.web3Service.artifactsToContract(crowdfunding_artifacts)
      .then((CrowdfundingAbstraction) => {
        this.crowdData = CrowdfundingAbstraction;
        this.getProjects();
      });
  }

  async getProjects() {
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
              data.getDetails({ from: this.auth.instantUser.ethAddress })
                .then((res) => {
                  console.log('res.state.:', res.currentState.toString());
                  console.log('res.status.:', res.currentStatus.toString());
                  console.log('res.progress.:', res.currentProgress.toString());
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
                  this.tokenAddress.setPHashMap(projectAddress, res.currentAmount)
                });
            });
          });
          this.data.setAddresses(this.projectAddresses);
        });

    });
  }

async approve(data, index) {
    console.log('Verifying the project')
    const projectContract = this.projectContractList[index];
    this.web3Service.artifactsToContract(project_artifacts)
      .then((ProjectAbstraction) => {
        ProjectAbstraction.at(projectContract).then((data) => {
          data.approveByBuyer({
            from: this.auth.instantUser.ethAddress
          }).then((res) => {
            console.log('res, event ...:', res)
          });
        });
      })
  }

  // async sendFinalMoney

  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.account = accounts[0];
      console.log('account[0]..:', this.account)

    });
  }

}