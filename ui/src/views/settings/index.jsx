import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../components/icon';
import ScrollableGrid from '../../components/grid';
import Card from '../../components/card';
import Header from "../../components/header";
import './Settings.css';



export default function SettingsPage() {
  return (
    <div id="settings">
      <Header main="Settings" />

      <ScrollableGrid>
        <Card>
          <Icon name="change" />
          <p className="secondary">Change Ingredient</p>
        </Card>

        <Card>
          <Icon className={"bubbles-icon"} name="bubbles" />
          <p className="secondary">Cleaning Cycle</p>
        </Card>

        <Card>
          <Icon name="settings" />
          <p className="secondary">Configuration</p>
        </Card>
      </ScrollableGrid>
    </div>
  );
}