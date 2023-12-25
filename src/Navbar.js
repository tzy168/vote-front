import {link} from 'react-router-dom';

const Navbar = ({walletAddress = '', connectWallet}) => {
    return (
        <nav className='navbar'>
            <div className='Navbar-brand'>VOTE BY ETHERS</div>
            <div className='navber-menu'>
                <button className='connect-wallet-button' onClick={connectWallet}>
                    {walletAddress.length > 0 ? (
                        'Connected: ' +
                        String(walletAddress).substring(0, 6) +
                        '...' +
                        String(walletAddress).substring(38)
                    ) : (
                        <span>Connect Wallet</span>
                    )}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;