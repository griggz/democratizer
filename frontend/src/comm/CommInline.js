import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import Moment from 'react-moment';

class CommInline extends Component {

    render() {
        const {comm} = this.props;
        const {elClass} = this.props;
        const showContent = elClass === 'card' ? 'd-block' : 'd-none';
        return (
            <div class="comms-list">
                {comm !== undefined ? <div className={elClass}>
                        <h1 class="comms-title"><Link
                            maintainScrollPosition={false} to={{
                            pathname: `/site-management/comms/${comm.slug}/`,
                            state: {fromDashboard: false}
                        }}>{comm.title}</Link>&nbsp;
                            <small className="publish_date text-muted"
                                   id='alt'>(Updated: <Moment fromNow ago>{comm.updated}</Moment> ago)
                            </small>
                        </h1>

                        <p className={showContent}>
                            <ReactMarkdown
                                source={comm.content.slice(0, 200).trim().concat('...')}/>
                            <Link
                                maintainScrollPosition={false} to={{
                                pathname: `/site-management/comms/${comm.slug}/`,
                                state: {fromDashboard: false}
                            }}>Read more
                            </Link></p>
                    </div>
                    : ""}
            </div>
        );
    }
}

export default CommInline
