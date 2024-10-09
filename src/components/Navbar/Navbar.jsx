import { Button, Drawer, Space } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PauseOutlined, CloseOutlined } from "@ant-design/icons";
import logo from "../../assets/logo.svg"

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    return (
        <nav className="w-[100vw] h-[8vh] flex justify-between items-center fixed z-[999] bg-white md:px-20 px-10" style={{overflow:'hidden'}}>
            <div className="flex gap-10">
                <section className="flex md:gap-4 gap-2 items-center">
                    <img src={logo} alt="logo" className="md:h-8 h-6" />
                    <a className="font-bold md:text-2xl text-xl" href="#home">INVOCIFY</a>
                </section>
                <aside className="hidden md:flex gap-5 items-center justify-between text-md ">
                    <a className="opacity-50 hover:opacity-100" href="#features" >Features</a>
                    <a className="opacity-50 hover:opacity-100" href="#faq" >FAQ</a>
                </aside>
            </div>
            <div className="flex items-center h-full gap-10">
                <section className="gap-5 hidden md:flex">
                    <a className="opacity-50 hover:opacity-100" href="#home" >Home</a>
                    <a className="opacity-50 hover:opacity-100" href="#about" >About</a>
                    <a className="opacity-50 hover:opacity-100" href="#contact" >Contact</a>
                </section>
                <Button
                    className="hidden md:block h-9 px-5"
                    color="default"
                    variant="solid"
                    size="medium"
                    onClick={() => { navigate('/auth') }}>
                    Get started
                </Button>
            </div>

            <Button 
                className="flex items-center justify-center md:hidden text-xl" 
                onClick={showDrawer} 
                size="large"
                type="none"
                >
                <PauseOutlined rotate={90} />
            </Button>

            <Drawer
                title={<h1 className="text-xl">Invocify</h1>}
                onClose={onClose}
                open={open}
                closeIcon={false}
                extra={
                    <Space>
                        <Button shape="circle" onClick={onClose} size="large"><CloseOutlined /></Button>
                    </Space>
                }>
                <aside className="flex flex-col justify-between h-full">
                    <section className="flex flex-col gap-5 text-lg">
                        <a href="#home" >Home</a>
                        <a href="#about" >About</a>
                        <a href="#features" >Features</a>
                        <a href="#faq" >Faq</a>
                        <a href="#contact" >Contact</a>
                    </section>
                    <Button className="rounded-button" size="large" onClick={() => { navigate('/auth') }}>
                        Sign in
                    </Button>
                </aside>
            </Drawer>
        </nav>
    );
}
