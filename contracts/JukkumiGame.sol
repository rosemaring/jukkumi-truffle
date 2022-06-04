// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@nomiclabs/buidler/console.sol";         // console.log("test :: name : " + name);
// import "hardhat/console.sol";
import "./JukkumiToken.sol";

interface IJukkumiGame {
    function createGame(string calldata title, string calldata rule, uint playerCountMin, uint playerCountMax, uint participationFee, uint hostDeposit, address[] calldata agentList) external returns (uint);
    function getPlayerList(uint gameIndex) external view returns (address[] memory);
    function getGame(uint gameIndex) external view returns (JukkumiGame.Game memory);
    function getGameList(uint limit, uint offset) external view returns (JukkumiGame.Game[] memory);
    function getGameInfo(uint gameIndex) external view returns (JukkumiGame.GameInfo memory);
    function getGameInfoList(uint limit, uint offset) external view returns (JukkumiGame.GameInfo[] memory);
    function startGame(uint gameIndex) external;
    function endGame(uint gameIndex, uint[] calldata winnerList, uint[] calldata rankOrder, uint[] calldata prizeByRank) external;
    function getGameCount() external view returns (uint);
    function join(uint gameIndex) external returns (uint playerNo);
}

contract JukkumiGame is IJukkumiGame {
    struct Game {
        uint index;
        string title;
        string rule;
        address host;
        address[] agentList;
        uint playerCountMin;
        uint playerCountMax;
        uint participationFee;
        uint hostDeposit;
        uint createdAt;
        uint startedAt;
        uint endAt;
        address[] playerList;
        GameStatus status;
    }
    
    struct Player {
        uint playerNo;
        address playerAddress;
        bool isWinner;
        uint rank;
        uint prize;
    }
    
    struct GameInfo {
        Game game;
        Player[] playerList;
    }
    
    enum GameStatus { Waiting, Playing, End }
    
    // using Counters for Counters.Counter;
    // Counters.Counter private _gameIndex;
    Game[] private _gameList;
    mapping(uint => Player[]) private _playerInfoList;

    address private _admin;
    // Game Admin Setting
    string private _project;
    string private _ownerFeePercent;
    uint private _playerLimit;
    uint private _fetchLimitMax;
    
    event CreateGame(uint indexed gameIndex, address indexed host);
    
    constructor() {
        _admin = msg.sender;
        _project = "Jukkumi Game";
        _playerLimit = 1000;
        _fetchLimitMax = 100;
    }
    
    
    
    function sendTest(uint value) public returns (uint newValue) {
        _playerLimit = value;
        return _playerLimit;
    }
    
    function getTest() public view returns (uint) {
        return _playerLimit;
    }
    
    function createGame(
        string calldata title, 
        string calldata rule, 
        uint playerCountMin, 
        uint playerCountMax, 
        uint participationFee,
        uint hostDeposit,
        address[] calldata agentList
    ) public returns (uint) {
        uint newGameIndex = _gameList.length;
        
        Game memory newGame = Game({
            index: newGameIndex,
            title: title,
            rule: rule,
            host: msg.sender,
            agentList: agentList,
            playerCountMin: playerCountMin,
            playerCountMax: playerCountMax,
            participationFee: participationFee,
            hostDeposit: hostDeposit,
            createdAt: block.timestamp,
            startedAt: 0,
            endAt: 0,
            playerList: new address[](0),
            status: GameStatus.Waiting
        });
        _gameList.push(newGame);
        emit CreateGame(newGameIndex, msg.sender);
        return newGameIndex;
    }
    
    function getPlayerList(uint gameIndex) public view returns (address[] memory playerList) {
        require(gameIndex < _gameList.length, "index is out of bounds");
        
        return _gameList[gameIndex].playerList;
    }    
    
    function getGame(uint gameIndex) public view returns (Game memory) {
        require(gameIndex < _gameList.length, "index is out of bounds");
        
        return _gameList[gameIndex];
    }
    
    function getGameList(uint limit, uint offset) public view returns (Game[] memory gameList) {
        require(offset <= _gameList.length, "offset is out of bounds");
        
        uint size = getGameCount() - offset;
        size = (size < limit) ? size : limit;
        size = (size < _fetchLimitMax) ? size : _fetchLimitMax;
        gameList = new Game[](size);
        
        for (uint i = 0; i < size; i++) {
            gameList[i] = _gameList[offset + i];
        }
        
        return gameList;
    }
    
    function getGameInfo(uint gameIndex) public view returns (GameInfo memory gameInfo) {
        require(gameIndex < _gameList.length, "index is out of bounds");
        
        gameInfo.game = _gameList[gameIndex];
        gameInfo.playerList = _playerInfoList[gameIndex];
        
        return gameInfo;
    }    
    
    function getGameInfoList(uint limit, uint offset) public view returns (GameInfo[] memory gameInfoList) {
        require(offset <= _gameList.length, "offset is out of bounds");
        
        uint size = getGameCount() - offset;
        size = (size < limit) ? size : limit;
        size = (size < _fetchLimitMax) ? size : _fetchLimitMax;
        gameInfoList = new GameInfo[](size);
        
        for (uint i = 0; i < size; i++) {
            gameInfoList[i].game = _gameList[offset + i];
            gameInfoList[i].playerList = _playerInfoList[i];
        }
        
        return gameInfoList;
    }    
    
    function startGame(uint gameIndex) public {
        require(gameIndex < _gameList.length, "no game");
        require(_gameList[gameIndex].host == msg.sender, "no ownership of this game");
        require(_gameList[gameIndex].status == GameStatus.Waiting, "not in a waiting status");
        require(_gameList[gameIndex].playerList.length >= _gameList[gameIndex].playerCountMin, "need more player");
        
        Game storage game = _gameList[gameIndex];
        game.startedAt = block.timestamp;
        // host send token(game.hostDeposit) and Game is started..? 
        game.status = GameStatus.Playing;
    }
    
    function endGame(uint gameIndex, uint[] calldata winnerList, uint[] calldata rankOrder, uint[] calldata prizeByRank) public {
        require(gameIndex < _gameList.length, "no game");
        require(_gameList[gameIndex].host == msg.sender, "no ownership of this game");
        require(_gameList[gameIndex].status == GameStatus.Playing, "not in a playing status");
        
        Game storage game = _gameList[gameIndex];
        game.endAt = block.timestamp;
        game.status = GameStatus.End;
        
        uint prizeTotal = 0;
        uint prizeCount = prizeByRank.length;
        for (uint i = 0; i < prizeCount; i++) {
            prizeTotal += prizeByRank[i];
        }
        
        uint preparedPrize = game.hostDeposit;
        uint playerCount = game.playerList.length;
        require(winnerList.length <= playerCount && rankOrder.length <= playerCount && prizeByRank.length <= playerCount, "param array index is out of bounds");

        preparedPrize += (playerCount * game.participationFee);
        require(preparedPrize >= prizeTotal, "prepared Prize is less than the Total Prize");
        
        for (uint i = 0; i < winnerList.length; i++) {
            _playerInfoList[gameIndex][winnerList[i] - 1].isWinner = true;
        }
        
        for (uint i = 0; i < rankOrder.length; i++) {
            _playerInfoList[gameIndex][rankOrder[i] - 1].rank = i + 1;
            
            if (i < prizeByRank.length) {
                _playerInfoList[gameIndex][rankOrder[i] - 1].prize = prizeByRank[i];
            }
        }
    }
    
    function getGameCount() public view returns (uint) {
        return _gameList.length;
    }
    
    function join(uint gameIndex) public returns (uint playerNo) {
        require(gameIndex < _gameList.length, "no game");
        require(_gameList[gameIndex].status == GameStatus.Waiting, "not in a waiting status");
        
        uint playerCount = _gameList[gameIndex].playerList.length;
        bool isJoin = true;
        for (uint i = 0; i < playerCount; i++) {
            if (_gameList[gameIndex].playerList[i] == msg.sender) {
                isJoin = false;
                break;
            }
        }
        require(isJoin == true, "already joined");
        
        uint playerCountMax = _gameList[gameIndex].playerCountMax;
        bool isFull = playerCount >= playerCountMax;
        require(isFull == false, "already fulled");
        
        // need rule for block host, agent
        // need token function...
        
        _gameList[gameIndex].playerList.push(msg.sender);
        playerNo = _gameList[gameIndex].playerList.length;
        Player memory newPlayer = Player({ playerNo: playerNo, playerAddress: msg.sender, isWinner: false, rank: 0, prize: 0 });
        _playerInfoList[gameIndex].push(newPlayer);
        
        return playerNo;
    }

    
 
    modifier joinGameModifier(uint price) {
        if (msg.value >= price) {
            _;
        }
   }
   
    // function getGameInfo2(uint gameIndex) public view returns (Game memory game, Player[] memory playerList) {
    //     require(gameIndex < _gameList.length, "index is out of bounds");
        
    //     game = _gameList[gameIndex];
    //     playerList = _playerInfoList[gameIndex];
        
    //     return (game, playerList);
    // }        
}