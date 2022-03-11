pragma experimental ABIEncoderV2;
import "./SafeMath.sol";

contract Crowdfunding {
    using SafeMath for uint256;

    // List of existing projects
    Project[] private projects;

    // Event that will be emitted whenever a new project is started
    event ProjectStarted(
        address contractAddress,
        address buyerAddress,
        address projectStarter,
        string projectTitle,
        uint256 interestRate,
        string projectDesc,
        uint256 deadline,
        uint256 goalAmount,
        string projectImage
    );

    function startProject(
        string calldata title,
        address payable buyer,
        uint256 interestRate,
        string calldata description,
        uint256 durationInDays,
        uint256 amountToRaise,
        string calldata image
    ) external {
        uint256 workUntil = now.add(durationInDays.mul(1 days));
        // uint256 _interestRate_bp = interestRate*100;
        Project newProject = new Project(
            msg.sender,
            buyer,
            title,
            interestRate,
            description,
            workUntil,
            amountToRaise,
            image
        );
        projects.push(newProject);
        emit ProjectStarted(
            address(newProject),
            msg.sender,
            buyer,
            title,
            interestRate,
            description,
            workUntil,
            amountToRaise,
            image
        );
    }

    function returnAllProjects() external view returns (Project[] memory) {
        return projects;
    }

    function returnMyOwnProjects() external view returns (Project[] memory) {
        return projects;
    }
}

contract Project {
    using SafeMath for uint256;

    // Data structures
    enum State {
        Fundraising,
        Expired,
        Successful
    }

    enum Status {
        NotVerifiedByBuyer,
        VerifiedByBuyer
    }

    enum Progress {
        Started,
        Finish
    }

    event progressChanged(string _e);

    address payable public creator;
    address payable public buyer;
    uint256 public amountGoal; // required to reach at least this much, else everyone gets refund
    uint256 public completeAt;
    uint256 public currentBalance;
    uint256 public workBy;
    string public title;
    uint256 public interestRate;
    string public description;
    string public image;
    State public state = State.Fundraising; // initialize on create
    Status public status = Status.NotVerifiedByBuyer;
    Progress public progress;
    address payable[] investors;
    // Progress public progress = Progress.Non;

    mapping(address => uint256) public contributions;

    // Modifier to check current state
    modifier inState(State _state) {
        require(state == _state);
        _;
    }

    modifier inStatus(Status _status) {
        require(status == _status);
        _;
    }

    modifier progressState(Progress _progress) {
        require(progress == _progress);
        _;
    }

    //Modifire to make sure the account is related to a buyer
    modifier isBuyer() {
        require(msg.sender == buyer);
        _;
    }

    modifier isCreator() {
        require(msg.sender == creator);
        _;
    }

    constructor(
        address payable projectStarter,
        address payable projectBuyer,
        string memory projectTitle,
        uint256 _interestRate,
        string memory projectDesc,
        uint256 workingDeadline,
        uint256 goalAmount,
        string memory projectImage
    ) public {
        creator = projectStarter;
        buyer = projectBuyer;
        title = projectTitle;
        interestRate = _interestRate;
        description = projectDesc;
        amountGoal = goalAmount;
        workBy = workingDeadline;
        currentBalance = 0;
        image = projectImage;
    }

    event fundingReceived(
        address contributer,
        uint256 amount,
        uint256 cuurentTotal
    );

    event CreatorPaid(address recipient, uint256 value);

    event InvestorPaid(address recipient, uint256 value);

    event BuyerPaysToContract(address sender, uint256 value);

    function getMyEnumValueByKey(string memory myEnum)
        public
        returns (Progress)
    {
        if (keccak256(bytes(myEnum)) == keccak256("Started"))
            return Progress.Started;
        if (keccak256(bytes(myEnum)) == keccak256("Finish"))
            return Progress.Finish;
    }

    function setProgressState(string calldata _e) external {
        progress = getMyEnumValueByKey(_e);
    }

    //Show the projects of a borrower
    function getDetailsBorrower()
        public
        view
        isCreator
        returns (
            address payable projectStarter,
            string memory projectTitle,
            // uint256 interestRate,
            string memory projectDesc,
            uint256 deadline,
            State currentState,
            Status currentStatus,
            Progress currentProgress,
            uint256 currentAmount,
            uint256 goalAmount,
            string memory projectImage,
            address payable[] memory _investors
        )
    {
        projectStarter = creator;
        projectTitle = title;
        // interestRate = interestRate;
        projectDesc = description;
        deadline = workBy;
        currentState = state;
        currentStatus = status;
        currentProgress = progress;
        currentAmount = currentBalance;
        goalAmount = amountGoal;
        projectImage = image;
        _investors = investors;
    }


    //Show approved projects of a buyer
    function getDetails()
        public
        view
        isBuyer
        returns (
            address payable projectStarter,
            string memory projectTitle,
            // uint256 interestRate,
            string memory projectDesc,
            uint256 deadline,
            State currentState,
            Status currentStatus,
            Progress currentProgress,
            uint256 currentAmount,
            uint256 goalAmount,
            string memory projectImage
        )
    {
        projectStarter = creator;
        projectTitle = title;
        // interestRate = interestRate;
        projectDesc = description;
        deadline = workBy;
        currentState = state;
        currentStatus = status;
        currentProgress = progress;
        currentAmount = currentBalance;
        goalAmount = amountGoal;
        projectImage = image;
    }

    //Show finished projects waiting for payment
    function getDetailsForBuyerPayment()
        public
        view
        isBuyer
        progressState(Progress.Finish)
        returns (
            address payable projectStarter,
            string memory projectTitle,
            string memory projectDesc,
            uint256 deadline,
            State currentState,
            Status currentStatus,
            Progress currentProgress,
            uint256 currentAmount,
            uint256 goalAmount,
            string memory projectImage
        )
    {
        projectStarter = creator;
        projectTitle = title;
        projectDesc = description;
        deadline = workBy;
        currentState = state;
        currentStatus = status;
        currentProgress = progress;
        currentAmount = currentBalance;
        goalAmount = amountGoal;
        projectImage = image;
    }


    //Show projects an investor invested on
    function getDetailsLender()
        public
        view
        inStatus(Status.VerifiedByBuyer)
        returns (
            address payable projectStarter,
            string memory projectTitle,
            // uint256 interestRate,
            string memory projectDesc,
            uint256 deadline,
            State currentState,
            Status currentStatus,
            Progress currentProgress,
            uint256 currentAmount,
            uint256 goalAmount,
            string memory projectImage
        )
    {
        projectStarter = creator;
        projectTitle = title;
        // interestRate = interestRate;
        projectDesc = description;
        deadline = workBy;
        currentState = state;
        currentStatus = status;
        currentProgress = progress;
        currentAmount = currentBalance;
        goalAmount = amountGoal;
        projectImage = image;
    }

    //to invest on a project as an investor
    function contribute() external payable inState(State.Fundraising) {
        contributions[msg.sender] = contributions[msg.sender].add(msg.value);
        investors.push(msg.sender);
        currentBalance = currentBalance.add(msg.value);
        emit fundingReceived(msg.sender, msg.value, currentBalance);
        checkIfFundingCompleteOrExpired();
    }

 
    function approveByBuyer() public inStatus(Status.NotVerifiedByBuyer) {
        status = Status.VerifiedByBuyer;
    }

    function checkIfFundingCompleteOrExpired() public {
        uint256 platformFees = 2;
        uint256 moneyNeeded = (amountGoal * 80) / 100;
        if ((currentBalance) >= moneyNeeded) {
            state = State.Successful;
            progress = Progress.Started;
            uint256 currentBalance = currentBalance - platformFees;
            payOut();
        } else if (block.timestamp > workBy) {
            state = State.Expired;
        }
        completeAt = block.timestamp;
    }

    // paying from investors to the borrower
    function payOut() internal inState(State.Successful) returns (bool) {
        uint256 totalRaised = currentBalance;

        currentBalance = 0;

        if (creator.send(totalRaised)) {
            emit CreatorPaid(creator, totalRaised);
            return true;
        } else {
            currentBalance = totalRaised;
            state = State.Successful;
        }

        return false;
    }

    // The buyer will send an amount of money to the contract
    function buyerPay() external payable progressState(Progress.Finish) {
        currentBalance = address(this).balance;
        if (currentBalance == 0) {
            emit BuyerPaysToContract(buyer, amountGoal);
            currentBalance = address(this).balance;
        }
        payingInvestors();
    }

    // The investors are getting paid
    function payingInvestors()
        internal
        progressState(Progress.Finish)
        returns (bool)
    {
        uint256 workInterest = (interestRate * workBy) / 360;
        uint256 x;
        for (uint256 i = 0; i < investors.length; i++) {
            require(contributions[investors[i]] > 0);
            require(currentBalance >= contributions[investors[i]]);
            uint256 investedmoney = contributions[investors[i]];
            uint256 investorInterest = (contributions[investors[i]] /
                ((amountGoal * 80) / 100)) * workInterest;
            contributions[investors[i]] = 0;

            if (investors[i].send(investedmoney + investorInterest)) {
                emit InvestorPaid(
                    investors[i],
                    investedmoney + investorInterest
                );
                currentBalance = currentBalance - investedmoney;
                x = 1;
            } else {
                x = 0;
            }

            if (currentBalance >= 0) {
                creator.send(currentBalance);
            }
        }
        if (x == 1) {
            return true;
        }
        return false;
    }
}
