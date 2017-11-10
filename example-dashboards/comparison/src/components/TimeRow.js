import React, { Component } from 'react';
import TimeCell from './TimeCell.js';

export default class TimeRow extends Component {
  state = {
    values: [],
  }

  constructor(props) {
    super(props);
    this.fetchAnalytics(props);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ values: [] });
    this.fetchAnalytics(newProps);
  }

  fetchAnalytics = async ({ query, columnKeys, queryBuilder }) => {
      const { aggregation, dimension, aggregationParam, licenseKey, fromDate, toDate,
        comparableKey, filters } = query;
      const runningQueries = columnKeys.map(columnKey => {
        const baseQuery = queryBuilder[aggregation](dimension, aggregationParam)
          .licenseKey(licenseKey)
          .between(fromDate, toDate)
          .filter(comparableKey, 'EQ', columnKey)
        const filteredQuery = filters.reduce((q, filterParams) => q.filter(...filterParams), baseQuery);
        return filteredQuery.query();
      })

      const queryResults = await Promise.all(runningQueries);
      const values = queryResults.map(({ rows }) => rows[0] ? rows[0][0] : null);

      this.setState({ values });
    }

  render() {
    const { columnKeys, query } = this.props;
    const { values } = this.state;
    const isLoading = values.length !== columnKeys.length;

    const sortedValues = values.filter(v => v !== null).sort((a, b) => a - b);
    const [lowestValue, ...highestValues] = sortedValues;
    const [highestValue,] = highestValues.reverse();

    // TODO: Set label on all queries
    return (
      <tr>
        <td>{query.label}</td>
        {columnKeys.map((key, index) =>
          React.createElement(
            query.cellType,
            { key, value: values[index], loading: isLoading, highestValue, lowestValue }
          )
        )}
        <td></td>
      </tr>
    );
  }
}
