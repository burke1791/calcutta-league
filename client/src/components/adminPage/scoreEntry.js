import React, { useState, useEffect } from 'react';

import { InputNumber, Form, Row, Col, Button } from 'antd';
import 'antd/dist/antd.css';

import Pubsub from '../../utilities/pubsub';
import { NOTIF } from '../../utilities/constants';
import AdminService from '../../utilities/adminService';

function ScoreEntry(props) {

  const [teams, setTeams] = useState([]);
  const [loadingAll, setLoadingAll] = useState(false);
  const [loading, setLoading] = useState({});

  useEffect(() => {
    handleMarchMadnessResults();
    Pubsub.subscribe(NOTIF.MM_RESULTS_DOWNLOADED, ScoreEntry, handleMarchMadnessResults);

    return (() => {
      Pubsub.unsubscribe(NOTIF.MM_RESULTS_DOWNLOADED, ScoreEntry);
    });
  }, []);

  const handleMarchMadnessResults = () => {
    console.log('handling results');
    setTeams(AdminService.marchMadnessResults);

    if (AdminService.marchMadnessResults && AdminService.marchMadnessResults.length) {
      let loadingObj = {};
      for (let game of AdminService.marchMadnessResults) {
        let gameCode = 'R' + game.round + game.gameId;
        loadingObj[gameCode] = false;
      }

      setLoading(loadingObj);
    }
  }

  const teamLabel = (teamObj) => {
    return '(' + teamObj.seed + ') ' + teamObj.name;
  }

  const getFields = () => {
    const { getFieldDecorator } = props.form;
    const children = [];
    if (teams && teams.length) {
      for (let game of teams) {
        let gameCode = 'R' + game.round + game.gameId
        children.push(
          <Row key={gameCode} type='flex' style={{ justifyContent: 'space-between' }}>
            <Col span={10}>
              <Form.Item label={teamLabel(game.team1)} style={{ display: 'flex' }}>
                {getFieldDecorator(`${gameCode}_team1`, {
                  rules: [
                    {
                      type: 'number',
                      message: 'Must be a number',
                    },
                  ],
                  initialValue: game.team1.score
                })(<InputNumber size='small' min={0} max={999} />)}
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label={teamLabel(game.team2)} style={{ display: 'flex' }}>
                {getFieldDecorator(`${gameCode}_team2`, {
                  rules: [
                    {
                      type: 'number',
                      message: 'Must be a number',
                    },
                  ],
                  initialValue: game.team2.score
                })(<InputNumber size='small' min={0} max={999} />)}
              </Form.Item>
            </Col>
            <Col span={4}>
              <Button type='default' icon='check' name={gameCode} onClick={handleSubmit} loading={loading[gameCode]} />
            </Col>
          </Row>
        );
      }
      return children;
    } else {
      return null;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // toggle loading inside the if branches

    let gameId = e.target.name;
    
    if (gameId === 'all-games') {
      setLoadingAll(true);
      // compare values to teams and only submit what's changed
    } else {
      setLoading({...loading, [e.target.name]: true});
      // compare values for the specific game and only submit what's changed
    }
    
  }

  return (
    <Form className='ant-advanced-search-form' onSubmit={handleSubmit} name='all-games'>
      {getFields()}
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type='primary' htmlType='submit' loading={loadingAll}>
            Submit Scores
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

const ScoreEntryForm = Form.create({ name: 'scoreEntry' })(ScoreEntry);

export default ScoreEntryForm;