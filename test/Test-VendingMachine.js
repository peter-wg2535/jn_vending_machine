const VendingMachine = artifacts.require("VendingMachine");

contract("VendingMachine" , (accounts)=> {

    before(async ()=>{

        x_contract=await VendingMachine.deployed()
    })
    it ('Test#1 starting balance of vending machine is 100', async()=>{
        const balance =await x_contract.getVendingMachineBalance()
        assert.equal(balance,100,"Starting bal is 100")
    })

    it ('Test#2 buy  donus', async()=>{
        //purchase(uint amount)  1ether/piece
        let s_balance =await x_contract.getVendingMachineBalance()
        console.log("Balance  balance :" ,s_balance)

        assert.equal(s_balance,100,"Starting bal is 100")

        await x_contract.purchase(1,{ from: accounts[0],value: web3.utils.toWei('2','ether')})
        
        let e_balance =await x_contract.getVendingMachineBalance()
        console.log("Balance  balance :" ,e_balance)

        assert.equal(e_balance,99,"Balance once somone bought 1 donut")
    })

    it ('Test#3 increasing some donuts and check updated balance of vending machine is 50', async()=>{

        //restock(uint amount) 
        await x_contract.restock(50)
        const balance =await x_contract.getVendingMachineBalance()
        assert.equal(balance,150,"Increasing  bal is 150")
    })



})