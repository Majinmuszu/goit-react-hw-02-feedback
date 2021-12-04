import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Feedback extends Component {
  static propTypes = {
    prop: PropTypes,
  };
  state = {
    good: 70,
    neutral: 8,
    bad: 12,
    total: 0,
    positive: 0,
  };
  countTotalFeedback = () => {
    this.setState((state) => ({
      ...state,
      total: state.good + state.neutral + state.bad,
    }));
  };
  countPositiveFeedbackPercentage = () => {
    this.setState((state) => ({
      ...state,
      positive: Math.round((state.good / state.total) * 100),
    }));
  };
  render() {
    const { good, neutral, bad, total, positive } = this.state;
    return (
      <div>
        <h1>Please leave feedback</h1>
        <button
          onClick={() => {
            this.countTotalFeedback();
            this.countPositiveFeedbackPercentage();
          }}
        >
          Good
        </button>
        <button>Neutral</button>
        <button>Bad</button>
        <h2>Statistics</h2>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
        <p>Total: {total}</p>
        <p>Positive feedback: {positive}%</p>
      </div>
    );
  }
}
