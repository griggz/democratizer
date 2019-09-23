import React, {Component} from 'react';

class ScrapeInline extends Component {

  render() {
    const {reviews} = this.props;
    const {site} = this.props
    const hrStyle = {
      display: 'block',
      height: '1px',
      border: 0,
      borderTop: '1px solid #ccc',
      margin: '1em 0',
      padding: '0',
      color: 'white'
    };
    return (
      <div>
        {site === 'yelp' ? <div className="col-lg-12">
          <td className="dash h5"><b>{reviews.author}</b> |</td>
          <td className="dash h5"><b>{reviews.date}</b> |</td>
          <td className="dash h5"><b>{reviews.rating}</b></td>
          <p className="dash">{reviews.review}</p>
          <hr style={hrStyle}/>
        </div> : <div className="col-lg-12">
          <td className="dash h5"><b>{reviews.current_employee}</b> |</td>
          <td className="dash h5"><b>{reviews.job_title}</b> |</td>
          <td className="dash h5"><b>{reviews.location_city}, {reviews.location_state}</b> |</td>
          <td className="dash h5"><b>(Rating: {reviews.rating})</b></td>
          <p className="dash">{reviews.review}</p>
          <hr style={hrStyle}/>
        </div>
        }
      </div>
    )
  }
}

export default ScrapeInline