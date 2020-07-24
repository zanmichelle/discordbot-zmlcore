const ZMLclient = require('./utils/ZMLcore');
const core = new ZMLclient();
const {db} = require('./utils/structures/BaseDB');

(async()=>{ await core.init(); })();


process.on('beforeExit',()=>{db.close();core.economy.close();core.warnings.close();});

process.on('exit',()=>{
    db.close();
    core.economy.close();
    core.warnings.close();
});
