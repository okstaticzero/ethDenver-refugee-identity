const TodoList = artifacts.require('../contracts/TodoList.sol')

contract('TodoList', function (accounts) {
    let todo;
    //run beforeEach - creating a new instance of TodoList each time
    beforeEach('setup contract for each test', async function () {
        todo = await TodoList.new();
        await todo.createAccount();
    })

    const account = accounts[0];

    it('Increments numberOfItems to 2', async function () {
        const todo1 = await todo.addTodo("item 1", account); //create first Item
        const todo2 = await todo.addTodo("item 2", account);  //create second Item
        const num = await todo.getTodoListLength(account)
        const expected = 2;
        assert.equal(num, expected)
    })

    it('getMyData returns 3 arrays', async function () {
        let x = await todo.addTodo("item 1", account);
        let arrays = await todo.getMyData(account);
        assert.equal(arrays.length, 3)
    })

    it('The first todo in the third array is: false - representing the "complete" value', async function () {
        await todo.addTodo("item 1", account);
        let arrays = await todo.getMyData(account);
        const expected = false;
        assert.equal(arrays[2][0], expected)
    })

    it('Check if the second todo contains the string(in bytes32) that it was set to', async function () {
        const itemName = "Item Two"
        await todo.addTodo("item one", account);//create item
        await todo.addTodo(itemName, account);//create item
        let arrays = await todo.getMyData(account);//get Items
        let expected = web3.fromAscii(itemName)//convert string to bytes
        const firstItemName = arrays[1][1]; // get name of first item (stored as byte32)
        console.log(arrays);
        const actual = firstItemName.substring(0, expected.length)// get name of first item and trim to same length (removes trailing zeros)
        assert.equal(actual, expected)
    })

})
