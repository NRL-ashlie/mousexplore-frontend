import React, { PureComponent } from 'react';
import moment from 'moment';
import HashLink from 'components/HashLink/HashLink';
import Spinner from 'components/Spinner/Spinner';
import NotFound from 'components/NotFound/NotFound';

class Block extends PureComponent {
  state = {
    visibleTxnCount: 10
  };

  handleViewMore = () => {
    this.setState({
      visibleTxnCount: this.state.visibleTxnCount + 10
    });
  }

  render() {
    const { className } = this.props;
    const { block, isLoading } = this.props;
    const { visibleTxnCount } = this.state;

    if (isLoading) {
      return <Spinner/>
    }

    if (!block || !block.hash) {
      return <NotFound/>
    }

    const txns = block.txns.slice(0, visibleTxnCount);

    return (
      <div>
        <div className={`nrl__block${className ? ' ' + className : ''}`}>
          <div className="nrl__block-info">
            <div className="nrl__block-info--icon">
              <i className="fa fa-cubes"/>
            </div>
            <div className="summary">
              <p className="height">Height: {block.height}</p>
              <span className="txn-count">Transactions: {block.txns.length}</span>
            </div>
          </div>
          <div className="nrl__block-info--detail">
            <div className="detail">
              <div className="left">
                <p className="property">
                  Block Hash: <HashLink hash={block.hash} type="block">{block.hash}</HashLink>
                </p>
                {
                  block.prevHash && (
                    <p className="property">
                      Previous Hash: <HashLink hash={block.prevHash} type="block">{block.prevHash}</HashLink>
                    </p>
                  )
                }
                {
                  block.nextHash && (
                    <p className="property">
                      Next Hash: <HashLink hash={block.nextHash} type="block">{block.nextHash}</HashLink>
                    </p>
                  )
                }
                {
                  block.merkleroot && (
                    <p className="property">
                      Merkle Root: {block.merkleRoot}
                    </p>
                  )
                }
              </div>
              <div className="right">
                {
                  block.confirmations && (
                    <p className="property">
                      Confirmations: {block.confirmations}
                    </p>
                  )
                }
                {
                  block.size && (
                    <p className="property">
                      Block Size: {block.size}
                    </p>
                  )
                }
                {
                  block.bits && (
                    <p className="property">
                      Bits: {block.bits}
                    </p>
                  )
                }
                {
                  block.nonce && (
                    <p className="property">
                      Nonce: {block.nonce}
                    </p>
                  )
                }
              </div>
              <div className="time">
                <p className="property">Timestamp: { moment.unix(block.timestamp).format('YYYY-M-D h:mm:ss a') }</p>
              </div>
            </div>
          </div>
        </div>
        <div className="nrl__block-txns">
          <h3 className="nrl__block-txns--title">
            Transactions In Block&nbsp;<span className="height">{block.height}</span>
          </h3>
          <div className="nrl__block-txns--table">
            <table>
              <tbody>
                {
                  txns.map((txn, index) => {
                    return (
                      <tr key={index} className="nrl__block-txns--item">
                        <td className="icon">
                          <i className="fa fa-cubes"/>
                        </td>
                        <td className="block-height">
                          <p className="label">Block Height</p>
                          <HashLink className="value" hash={block.height} type="block">{block.height}</HashLink>
                        </td>
                        <td className="hash">
                          <p className="label">TX Hash</p>
                          <HashLink className="value" hash={txn.hash || txn} type="transaction">
                            {
                              txn.hash ? txn.hash.substring(0,25) + '...' : txn.substring(0,25) + '...'
                            }
                          </HashLink>
                        </td>
                        <td className="time">
                          <p className="label">Time</p>
                          <span className="value">{moment.unix(block.timestamp).fromNow()}</span>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>                                                        
          <div className="nrl__block-txns--more">
            {
              (visibleTxnCount < block.txns.length) && (
                <a className="btn-viewmore" onClick={this.handleViewMore}>View More</a>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Block;                                                                                                                                                                                                                                                                                     
