supersonicFlow = require('../index');

const isentropicFlow = supersonicFlow.isentropicFlow(2);
console.log(isentropicFlow);

const normalShock = supersonicFlow.normalShock(2);
console.log(normalShock);

const obliqueShock = supersonicFlow.obliqueShock(2, 20);
console.log(obliqueShock);

const expansionFan = supersonicFlow.expansionFan(2, 20);
console.log(expansionFan);



