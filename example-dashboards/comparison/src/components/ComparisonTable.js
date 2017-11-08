import React, { Component } from 'react';
import { Table, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import countryList from 'country-list';
import Bitmovin from 'bitmovin-javascript';
import CountryCell from './CountryCell.js';
import AddCountryModal from './AddCountryModal.js';
import './ComparisonTable.css';

const countries = countryList();

export default class ComparisonTable extends Component {
  constructor({ apiKey, licenseKey, fromDate, toDate }) {
    super();
    console.log(apiKey);
    const bitmovin = new Bitmovin({ apiKey });
    this.state = {
      queryBuilder: bitmovin.analytics.queries.builder,
      selectedCountries: ['US', 'AT', 'DE'],
      showAddCountryModal: false,
    };
  }

  changeCountryCode = (index) => (event) => {
    const selectedCountries = [...this.state.selectedCountries];
    selectedCountries[index] = event.currentTarget.value;
    this.setState({ selectedCountries });
  }

  addCountryCode = (code) => {
    const selectedCountries = [...this.state.selectedCountries, code];
    this.setState({ selectedCountries });
  }

  handleAddButtonClick = () => {
    this.setState({ showAddCountryModal: true });
  }

  hideAddCountryModal = () => {
    this.setState({ showAddCountryModal: false });
  }

  removeCountry = (countryCode) => () => {
    const selectedCountries = this.state.selectedCountries.filter(c => c !== countryCode);
    this.setState({ selectedCountries });
  }

  render() {
    const { fromDate, toDate, licenseKey } = this.props;
    const { selectedCountries, queryBuilder } = this.state;

    const removeTooltip = (
      <Tooltip id="tooltip">Remove this country.</Tooltip>
    );

    const addTooltip = (
      <Tooltip id="tooltip">Add another country.</Tooltip>
    );

    return (
      <div className="ComparisonTable">
        <Table>
          <thead>
            <tr>
              <th></th>
              {selectedCountries.map((countryCode, index) =>
                <th key={`header-${countryCode}`}>
                  {countries.getName(countryCode)}
                  <OverlayTrigger placement="top" overlay={removeTooltip}>
                    <Button bsSize="xsmall" className="remove" onClick={this.removeCountry(countryCode)}>–</Button>
                  </OverlayTrigger>
                </th>
              )}
              <th>
                <OverlayTrigger placement="top" overlay={addTooltip}>
                  <Button bsStyle="primary" bsSize="xsmall" onClick={this.handleAddButtonClick}>+</Button>
                </OverlayTrigger>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total Startup Time (median)</td>
              {selectedCountries.map(country =>
                <CountryCell
                  key={`${country}-STARTUPTIME-median`}
                  country={country}
                  fromDate={fromDate}
                  toDate={toDate}
                  licenseKey={licenseKey}
                  aggregation="median"
                  dimension="STARTUPTIME"
                  queryBuilder={queryBuilder}
                />
              )}
            </tr>
          </tbody>
        </Table>
        <AddCountryModal
          onAdd={this.addCountryCode}
          show={this.state.showAddCountryModal}
          onHide={this.hideAddCountryModal}
          countries={countries}
        />
      </div>
    );
  }
}
