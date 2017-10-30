const { NODE_ENV } = process.env;
const production = "production"

const isProduction = NODE_ENV === production;
module.exports = {
    isProduction
};
