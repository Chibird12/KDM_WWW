import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _filter from "lodash/filter";
import Header from "../../components/Header/Header";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Notes from "./_Notes";
import Stats from "./_SurvivorStats";
import Assets from "./_Assets";
import Armor from "./_Armor";
import Bleeding from "./_Bleeding";
import Survival from "./_Survival";
import XP from "./_XP";
import Courage from "./_Courage";
import Understanding from "./_Understanding";
import Weapon from "./_Weapon";
import { getSettlement } from "../../actions/getSettlement";

class Survivor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settlementData: null,
      survivor: null
    };
  }
  componentDidMount() {
    if (this.props.settlementData === null) {
      this.props.getSettlement(this.props.params.oid);
    }
    if (this.props.settlementData) {
      const arr = _filter(
        this.props.settlementData.user_assets.survivors,
        survivor => {
          if (survivor.sheet._id.$oid === this.props.params.survivorId) {
            return survivor;
          }
        }
      );
      this.setState({
        settlementData: this.props.settlementData,
        survivor: arr[0]
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.settlementData && this.props.settlementData === null) {
      this.setState({
        settlementData: nextProps.settlementData
      });
    }
    if (nextProps.settlementData) {
      const arr = _filter(
        nextProps.settlementData.user_assets.survivors,
        survivor => {
          if (survivor.sheet._id.$oid === this.props.params.survivorId) {
            return survivor;
          }
        }
      );
      this.setState({
        settlementData: nextProps.settlementData,
        survivor: arr[0]
      });
    }
  }
  render() {
    if (this.state.survivor) {
      return (
        <div>
          <Header name={this.state.survivor.sheet.name} showBack />
          <div className="layout layout--survivor">
            {/* <h1 className="text-center">{this.state.survivor.sheet.name}</h1> */}
            <Survival
              amount={this.state.survivor.sheet.survival}
              oid={this.state.survivor.sheet._id.$oid}
              limit={this.state.settlementData.sheet.survival_limit}
              actions={this.state.survivor.survival_actions}
              canIncrease={this.state.survivor.sheet.can_gain_survival}
              canDecrease={!this.state.survivor.sheet.cannot_spend_survival}
            />
            <Bleeding
              amount={this.state.survivor.sheet.bleeding_tokens}
              oid={this.state.survivor.sheet._id.$oid}
              limit={this.state.survivor.sheet.max_bleeding_tokens}
            />
            <XP
              oid={this.state.survivor.sheet._id.$oid}
              amount={this.state.survivor.sheet.hunt_xp}
              milestones={
                this.state.settlementData.survivor_attribute_milestones.hunt_xp
              }
            />
            <Courage
              oid={this.state.survivor.sheet._id.$oid}
              amount={this.state.survivor.sheet.Courage}
              limit={9}
              milestones={
                this.state.settlementData.survivor_attribute_milestones.Courage
              }
            />
            <Understanding
              oid={this.state.survivor.sheet._id.$oid}
              amount={this.state.survivor.sheet.Understanding}
              limit={9}
              milestones={
                this.state.settlementData.survivor_attribute_milestones
                  .Understanding
              }
            />
            <Weapon
              oid={this.state.survivor.sheet._id.$oid}
              amount={this.state.survivor.sheet["Weapon Proficiency"]}
              limit={8}
              milestones={[{ handle: "ui_prompt", values: [3, 8] }]}
            />
            {/* <Stats
              oid={this.state.survivor.sheet._id.$oid}
              stats={[
                { movement: this.state.survivor.sheet.Movement },
                { accuracy: this.state.survivor.sheet.Accuracy },
                { strength: this.state.survivor.sheet.Strength },
                { evasion: this.state.survivor.sheet.Evasion },
                { luck: this.state.survivor.sheet.Luck },
                { speed: this.state.survivor.sheet.Speed }
              ]}
            /> */}
            <Stats
              oid={this.state.survivor.sheet._id.$oid}
              movement={{
                stat: this.state.survivor.sheet.Movement,
                token: this.state.survivor.sheet.attribute_detail.Movement
                  .tokens,
                gear: this.state.survivor.sheet.attribute_detail.Movement.gear
              }}
              accuracy={{
                stat: this.state.survivor.sheet.Accuracy,
                token: this.state.survivor.sheet.attribute_detail.Accuracy
                  .tokens,
                gear: this.state.survivor.sheet.attribute_detail.Accuracy.gear
              }}
              strength={{
                stat: this.state.survivor.sheet.Strength,
                token: this.state.survivor.sheet.attribute_detail.Strength
                  .tokens,
                gear: this.state.survivor.sheet.attribute_detail.Strength.gear
              }}
              evasion={{
                stat: this.state.survivor.sheet.Evasion,
                token: this.state.survivor.sheet.attribute_detail.Evasion
                  .tokens,
                gear: this.state.survivor.sheet.attribute_detail.Evasion.gear
              }}
              luck={{
                stat: this.state.survivor.sheet.Luck,
                token: this.state.survivor.sheet.attribute_detail.Luck.tokens,
                gear: this.state.survivor.sheet.attribute_detail.Luck.gear
              }}
              speed={{
                stat: this.state.survivor.sheet.Speed,
                token: this.state.survivor.sheet.attribute_detail.Speed.tokens,
                gear: this.state.survivor.sheet.attribute_detail.Speed.gear
              }}
            />
            <Armor
              oid={this.state.survivor.sheet._id.$oid}
              values={{
                brain: this.state.survivor.sheet.Insanity,
                head: this.state.survivor.sheet.Head,
                arms: this.state.survivor.sheet.Arms,
                body: this.state.survivor.sheet.Body,
                waist: this.state.survivor.sheet.Waist,
                legs: this.state.survivor.sheet.Legs
              }}
            />
            <Assets
              name="Fighting Arts"
              type="fighting_art"
              apiType="fighting_arts"
              survivorList={this.state.survivor.sheet.fighting_arts}
              assetList={this.state.settlementData.game_assets.fighting_arts}
              oid={this.state.survivor.sheet._id.$oid}
              maximum={3}
              placeholderNumber={3}
            />
            <Assets
              name="Disorders"
              type="disorder"
              apiType="disorders"
              survivorList={this.state.survivor.sheet.disorders}
              assetList={this.state.settlementData.game_assets.disorders}
              oid={this.state.survivor.sheet._id.$oid}
              maximum={3}
              placeholderNumber={3}
            />
            <Assets
              name="Abilities"
              type="ability"
              apiType="abilities_and_impairments"
              survivorList={this.state.survivor.sheet.abilities_and_impairments}
              assetList={
                this.state.settlementData.game_assets.abilities_and_impairments
              }
              oid={this.state.survivor.sheet._id.$oid}
            />
            <Assets
              name="Impairments"
              type="impairment"
              apiType="abilities_and_impairments"
              survivorList={this.state.survivor.sheet.abilities_and_impairments}
              assetList={
                this.state.settlementData.game_assets.abilities_and_impairments
              }
              oid={this.state.survivor.sheet._id.$oid}
            />
            <Assets
              name="Severe Injuries"
              type="severe_injury"
              apiType="abilities_and_impairments"
              survivorList={this.state.survivor.sheet.abilities_and_impairments}
              assetList={
                this.state.settlementData.game_assets.abilities_and_impairments
              }
              oid={this.state.survivor.sheet._id.$oid}
              allowDuplicates
            />
            {/* <Notes
              oid={this.state.survivor.sheet._id.$oid}
              notes={this.state.survivor.sheet.notes}
            /> */}
          </div>
        </div>
      );
    }
    return <LoadingSpinner />;
  }
}

function mapStateToProps(state) {
  return {
    settlementData: state.settlementData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getSettlement
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Survivor);
