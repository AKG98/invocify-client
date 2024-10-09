import { Card, Col, Row, Statistic } from 'antd';
import { ShopOutlined, UsergroupAddOutlined, StockOutlined } from '@ant-design/icons';

export default function StatisticsC( { storeCount, clientCount, lastMonthRevenue, currentMonthRevenue }) {
  return (
    <main>
        <Row gutter={[16, 16]}>
          <Col xs={12} md={6}>
            <Card bordered className='bg-white border-2'>
              <Statistic
                title={<div className='font-bold'>Total Stores</div>}
                value={storeCount}
                valueStyle={{ color: 'rgb(129 140 248)' }}
                prefix={<ShopOutlined />}
              />
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card bordered className='bg-white border-2'>
              <Statistic
                title={<div className='font-bold'>Total Clients</div>}
                value={clientCount}
                valueStyle={{ color: 'rgb(129 140 248)' }}
                prefix={<UsergroupAddOutlined />}
              />
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card bordered className='bg-white border-2'>
              <Statistic
                title={<div className='font-bold'>Last month&apos;s Revenue</div>}
                value={lastMonthRevenue}
                precision={2}
                valueStyle={{ color: 'rgb(129 140 248)' }}
                prefix={<StockOutlined />}
                suffix="₹"
              />
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card bordered className='bg-white border-2'>
              <Statistic
                title={<div className='font-bold'>This month&apos;s Revenue</div>}
                value={currentMonthRevenue}
                precision={2}
                valueStyle={{ color: 'rgb(129 140 248)' }}
                prefix={<StockOutlined />}
                suffix="₹"
              />
            </Card>
          </Col>
        </Row>
      </main>
  )
}
