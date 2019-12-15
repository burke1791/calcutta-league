import React, { useState, useEffect } from 'react';

import { InputNumber, Form, Row, Col, Button } from 'antd';
import 'antd/dist/antd.css';

function ScoreEntry(props) {

  const [teams, setTeams] = useState([]);
  const [loadingAll, setLoadingAll] = useState(false);
  const [loading, setLoading] = useState({});

  useEffect(() => {
    setTeams({
      'R1W1': {
        'team1': {
          'seed': 1,
          'name': 'Illinois',
          'score': 69
        },
        'team2': {
          'seed': 16,
          'name': 'Rutgers',
          'score': 30
        }
      },
      'R1W2': {
        'team1': {
          'seed': 2,
          'name': 'Michigan State',
          'score': null
        },
        'team2': {
          'seed': 15,
          'name': 'Northwestern',
          'score': null
        }
      }
    });

    setLoading({
      'R1W1': false,
      'R1W2': false
    });
  }, []);

  const teamLabel = (teamObj) => {
    return '(' + teamObj.seed + ') ' + teamObj.name;
  }

  const getFields = () => {
    const { getFieldDecorator } = props.form;
    const children = [];
    for (let gameCode in teams) {
      children.push(
        <Row key={gameCode} type='flex' style={{ justifyContent: 'space-between' }}>
          <Col span={10}>
            <Form.Item label={teamLabel(teams[gameCode].team1)} style={{ display: 'flex' }}>
              {getFieldDecorator(`${gameCode}_team1`, {
                rules: [
                  {
                    type: 'number',
                    message: 'Must be a number',
                  },
                ],
                initialValue: teams[gameCode].team1.score
              })(<InputNumber size='small' min={0} max={999} />)}
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label={teamLabel(teams[gameCode].team2)} style={{ display: 'flex' }}>
              {getFieldDecorator(`${gameCode}_team2`, {
                rules: [
                  {
                    type: 'number',
                    message: 'Must be a number',
                  },
                ],
                initialValue: teams[gameCode].team2.score
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