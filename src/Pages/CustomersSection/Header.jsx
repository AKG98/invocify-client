import { UsergroupAddOutlined } from '@ant-design/icons';

export default function Header() {
  return (
    <header className='mb-5'>
        <span>
          <UsergroupAddOutlined className="text-4xl mr-2" />
        </span>
        <span>
          <span className="text-3xl font-semibold">My Clients</span>
          <p className="text-sm">Manage your clients details here.</p>
        </span>
      </header>
  )
}
