import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JSONTree from 'react-json-tree';
import vkbeautify from 'vkbeautify';
import { Row, Col, Button, Glyphicon } from 'react-bootstrap';

const ViewAsJson = ({ detail, contentType, label, id }) => {
  if (!detail) {
    return null;
  }
  let renderedRawData = null;
  if (contentType) {
    if (contentType.lastIndexOf('application/json') !== -1) {
      renderedRawData = <JSONTree data={detail || {}} theme={'grayscale'} />;
    } else if (contentType.lastIndexOf('application/xml') !== -1) {
      renderedRawData = <pre>{vkbeautify.xml(detail)}</pre>;
    } else {
      renderedRawData = <pre>{detail}</pre>;
    }
  } else {
    renderedRawData = <pre>{detail}</pre>;
  }
  return (
    <div>
      <h1>{label || id}</h1>
      {renderedRawData}
    </div>
  );
};

class DetailView extends Component {
  componentDidMount() {
    if (!this.props.detail) {
      this.props.loadDetail(this.props.id);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      if (!this.props.detail) {
        this.props.loadDetail(this.props.id);
      }
    }
  }

  render() {
    return (
      <Row>
        <Col md={12}>
          <div className="pull-right">
            <Button
              bsStyle="default"
              bsSize="small"
              className="btn-raised"
              onClick={() => this.props.loadDetail(this.props.id)}
            >
              <Glyphicon glyph="refresh" />
            </Button>
          </div>
          {this.props.error ? (
            <div id="detail">
              <p>
                <strong>There was an error retrieving this document.</strong>
              </p>
              <p>
                The server sent the following error message:&nbsp;
                <span className="text-danger">{this.props.error}</span>
              </p>
            </div>
          ) : (
            this.props.detail && (
              <div id="detail">
                <this.props.template {...this.props} />
              </div>
            )
          )}
        </Col>
      </Row>
    );
  }
}

DetailView.defaultProps = {
  template: ViewAsJson
};

DetailView.propTypes = {
  detail: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  template: PropTypes.func,
  contentType: PropTypes.string,
  error: PropTypes.string
};

export default DetailView;
