import React, { Component } from "react";
import PropTypes from "prop-types";
import "./App.css";
import { FeedbackOptions } from "./components/FeedbackOptions/FeedbackOptions";
import { Section } from "./components/Section/Section";
import { Statistics } from "./components/Statistics/Statistics";
import { Notification } from "./components/Notification/Notification";

export default class App extends Component {
  static propTypes = {
    good: PropTypes.number,
    neutral: PropTypes.number,
    bad: PropTypes.number,
    total: PropTypes.number,
    positive: PropTypes.number,
  };

  state = {
    good: 0,
    neutral: 0,
    bad: 0,
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

  goodFeedIncrement = () => {
    this.setState((state) => ({ ...state, good: state.good + 1 }));
    this.countTotalFeedback();
    this.countPositiveFeedbackPercentage();
  };

  neutralFeedIncrement = () => {
    this.setState((state) => ({ ...state, neutral: state.neutral + 1 }));
    this.countTotalFeedback();
    this.countPositiveFeedbackPercentage();
  };

  badFeedIncrement = () => {
    this.setState((state) => ({ ...state, bad: state.bad + 1 }));
    this.countTotalFeedback();
    this.countPositiveFeedbackPercentage();
  };

  render() {
    return (
      <div className="App">
        <Section title="Please Leave Feedback">
          <FeedbackOptions
            onLeaveFeedback="good"
            options={this.goodFeedIncrement}
          ></FeedbackOptions>
          <FeedbackOptions
            onLeaveFeedback="neutral"
            options={this.neutralFeedIncrement}
          ></FeedbackOptions>
          <FeedbackOptions
            onLeaveFeedback="bad"
            options={this.badFeedIncrement}
          ></FeedbackOptions>
        </Section>
        <Section title="Statistics">
          {this.state.total === 0 ? (
            <Notification message="There is no feedback" />
          ) : (
            <Statistics
              good={this.state.good}
              neutral={this.state.neutral}
              bad={this.state.bad}
              total={this.state.total}
              positivePercentage={this.state.positive}
            ></Statistics>
          )}
        </Section>
      </div>
    );
  }
}
