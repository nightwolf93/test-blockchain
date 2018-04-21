const blockchain = [];

/**
 * Add a block to the blockchain
 * @param {*} block 
 */
export const addBlockToChain = (block) => {
    if(block.hash == "") {
        logger.error("The block " + block.index + " is not hashed yet, we can't accept it")
        return;
    }
    this.blockchain[block.index] = block;
}