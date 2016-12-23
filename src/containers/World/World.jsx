import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getHome } from '../../actions/getHome';
import { getWorld } from '../../actions/getWorld';
import { getSettlement } from '../../actions/getSettlement';
import { getSurvivor } from '../../actions/getSurvivor';
import TugGraph from '../../components/TugGraph/TugGraph';
import Stat from '../../components/Stats/Stats';
import Survival from '../../components/Survivor/Survival';
import SurvivorXP from '../../components/Survivor/Survivor-XP';

class World extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      worldData: null,
    };
  }
  componentDidMount() {
    this.props.getWorld();
    this.props.getSettlement();
    this.props.getSurvivor();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.worldData) {
      this.setState({
        worldData: nextProps.worldData,
      });
    }
    if (nextProps.survivorData) {
      this.setState({
        survivorData: nextProps.survivorData,
      });
    }
  }
  render() {
    if (this.state.worldData) {
      return (
        <div className="page-world">
          <main className="main">

            <div className="boxGroup">
              <Survival number={this.state.Survival} />
              <div className="box">
                <header className="box-header">
                  <div className="box-header-title">Bleeding</div>
                </header>
                <div className="box-content">
                  <div className="statGroup">
                    <Stat />
                  </div>
                </div>
              </div>
              <div className="box">
                <header className="box-header">
                  <div className="box-header-title">Additional XP</div>
                </header>
                <div className="box-content">
                  <div className="statGroup">
                    <SurvivorXP number={this.state.survivorData.hunt_xp} />
                    <Stat title="Courage" number={this.state.Courage} />
                    <Stat title="Understanding" number={this.state.Understanding} />
                    <Stat title="Weapon" number={this.state.Weapon} />
                  </div>
                </div>
              </div>
            </div>

            <div className="boxGroup">
              <div className="box">
                <header className="box-header">
                  <div className="box-header-title">Primary Stats</div>
                </header>
                <div className="box-content">
                  <div className="statGroup">
                    <Stat title="Movement" number={this.state.Movement} />
                    <Stat title="Accuracy" number={this.state.Accuracy} />
                    <Stat title="Strength" number={this.state.Strength} />
                    <Stat title="Evasion" number={this.state.Evasion} />
                    <Stat title="Luck" number={this.state.Luck} />
                    <Stat title="Speed" number={this.state.Speed} />
                  </div>
                </div>
              </div>
            </div>

            <div className="boxGroup">
              <div className="box">
                <header className="box-header">
                  <div className="box-header-title">Armor</div>
                </header>
                <div className="box-content">
                  <div className="statGroup">
                    <Stat title="Brain" number={this.state.Brain} />
                    <Stat title="Head" number={this.state.Head} />
                    <Stat title="Arms" number={this.state.Arms} />
                    <Stat title="Body" number={this.state.Body} />
                    <Stat title="Waist" number={this.state.Waist} />
                    <Stat title="Feet" number={this.state.Feet} />
                  </div>
                </div>
              </div>
            </div>

            <div className="boxGroup">
              <div className="box">
                <header className="box-header">
                  <div className="box-header-title">Fighting Arts</div>
                </header>
                <div className="box-content">
                  <div className="statGroup">&nbsp;
                  </div>
                </div>
              </div>
              <div className="box">
                <header className="box-header">
                  <div className="box-header-title">Disorders</div>
                </header>
                <div className="box-content">
                  <div className="statGroup">&nbsp;
                  </div>
                </div>
              </div>
            </div>

            <div className="boxGroup">
              <div className="box">
                <header className="box-header">
                  <div className="box-header-title">Abilities</div>
                </header>
                <div className="box-content">
                  <div className="statGroup">&nbsp;
                  </div>
                </div>
              </div>
            </div>

            <div className="boxGroup">
              <div className="box">
                <header className="box-header">
                  <div className="box-header-title">Impairments</div>
                </header>
                <div className="box-content">
                  <div className="statGroup">&nbsp;
                  </div>
                </div>
              </div>
            </div>

            <div className="boxGroup">
              <div className="box">
                <header className="box-header">
                  <div className="box-header-title">Additional Notes</div>
                </header>
                <div className="box-content">
                  <div className="statGroup">&nbsp;
                  </div>
                </div>
              </div>
            </div>

            <div className="widgetGroup">Global Totals</div>

            <div className="widget">
              <TugGraph title="Settlements" aLabel="Active" aValue={this.state.worldData.world.active_settlements.value} bLabel="Ended" bValue={this.state.worldData.world.abandoned_settlements.value} />
            </div>

            <div className="widget">
              <TugGraph title="Survivors" aLabel="Alive" aValue={this.state.worldData.world.live_survivors.value} bLabel="Dead" bValue={this.state.worldData.world.dead_survivors.value} />
            </div>
            <div className="widget">
              {this.state.worldData.world.total_users.value}
              {this.state.worldData.world.total_users.name}
              <br />
              {this.state.worldData.world.total_users_last_30.value}
              {this.state.worldData.world.total_users_last_30.name}
              <br />
              {this.state.worldData.world.avg_user_survivors.value}
              {this.state.worldData.world.avg_user_survivors.name}
              {this.state.worldData.world.avg_user_survivors.comment}
              <br />
              {this.state.worldData.world.avg_user_settlements.value}
              {this.state.worldData.world.avg_user_settlements.name}
            </div>

            <div className="widgetGroup">Settlements</div>
            <div className="widget">
              {this.state.worldData.world.avg_ly.value}
              {this.state.worldData.world.avg_ly.name}
              <br />
              {this.state.worldData.world.avg_expansions.value}
              {this.state.worldData.world.avg_expansions.name}
              <br />
              {this.state.worldData.world.avg_storage.value}
              {this.state.worldData.world.avg_storage.name}
              <br />
              {this.state.worldData.world.avg_innovations.value}
              {this.state.worldData.world.avg_innovations.name}
              <br />
              {this.state.worldData.world.avg_defeated_monsters.value}
              {this.state.worldData.world.avg_defeated_monsters.name}
              <br />
              {this.state.worldData.world.avg_milestones.value}
              {this.state.worldData.world.avg_milestones.name}
            </div>
            <div className="widget">
              Population
              {this.state.worldData.world.avg_pop.value}
              {this.state.worldData.world.avg_pop.name}
              <br />
              {this.state.worldData.world.max_pop.value}
              {this.state.worldData.world.max_pop.name}
            </div>
            <div className="widget">
              Death
              {this.state.worldData.world.avg_death_count.value}
              {this.state.worldData.world.avg_death_count.name}
              <br />
              {this.state.worldData.world.max_death_count.value}
              {this.state.worldData.world.max_death_count.name}
            </div>
            <div className="widget">
              Survival
              {this.state.worldData.world.avg_survival_limit.value}
              {this.state.worldData.world.avg_survival_limit.name}
              <br />
              {this.state.worldData.world.max_survival_limit.value}
              {this.state.worldData.world.max_survival_limit.name}
            </div>

          </main>
        </div>
      );
    } else {
      return null;
    }
  }
}

function mapStateToProps(state) {
  return {
    worldData: state.worldData,
    survivorData: state.survivorData,
    settlementData: state.settlementData,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getWorld,
    getSettlement,
    getSurvivor,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(World);
