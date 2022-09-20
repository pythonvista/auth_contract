// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Todos {
  struct Users{
        string username;
        uint256 password;
    }

    Users[] public AllUsers;

    function CreateAccount(string memory _username, uint256 _password) public{
        AllUsers.push(Users(_username, _password));
    }

    function Login(string memory _username, uint256 _password) public view returns(string memory){
        for (uint256 i = 0; i < AllUsers.length; i++){
            if(keccak256(abi.encodePacked(AllUsers[i].username)) == keccak256(abi.encodePacked(_username))){
                if(AllUsers[i].password == _password){
                    return 'Logged in';
                }else{
                    return 'User found but Incorrect Password';
                }
            }
        }

        return 'User Not Found';
    }
  
}


