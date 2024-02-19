const oracledb = require('oracledb');

const connectToDatabase = async function() {

    try {
        const connection = await oracledb.getConnection({
            user: 'your_username',
            password: 'your_password',
            connectString: 'localhost/orcl'
        });

        if(connection) console.log('DB Connected')

        return connection;
    } catch (err) {
        console.error(err);
        throw err; 
    }
}


module.exports = connectToDatabase