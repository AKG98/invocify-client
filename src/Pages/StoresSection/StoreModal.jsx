import { Button, Form, Input, message, Modal } from "antd";
import { useSelector } from "react-redux";
import { useAddStoreMutation, useUpdateStoreMutation } from "../../features/Slices/storesApi";

export default function StoreModal({ formType, isModal, setIsModal, data }) {
    const user = useSelector((state) => state.user.user);
    const [updateStore] = useUpdateStoreMutation();
    const [createStore] = useAddStoreMutation();

    async function handleSave(values) {
        if (formType === "Create Store") {
            const dataBody = {...values,owner:user._id};
            await createStore(dataBody).unwrap();
            message.success("Store created successfully");
        } else {
            await updateStore({storeId:data._id,...values}).unwrap();
            message.success("Store updated successfully");
        }
        setIsModal(false);
    }

    return (
        <Modal
            title={formType}
            open={isModal}
            footer={null}
            onCancel={() => setIsModal(false)}
        >
            <Form initialValues={data} onFinish={handleSave}> {/* Added onFinish */}
                <Form.Item 
                    name="name" 
                    rules={[
                        {
                            required:true,
                            message:"Name is required"
                        }
                    ]}
                >
                    <Input placeholder="Store Name" />
                </Form.Item>
                <Form.Item 
                    name="gst"
                    rules={[
                        {
                            required:true,
                            message:"Gst is required"
                        }
                    ]}
                    >
                    <Input placeholder="GST Number" />
                </Form.Item>
                <Form.Item 
                    name="phone"
                    rules={[
                        {
                            required:true,
                            message:"Phone number is required"
                        }
                    ]}
                    >
                    <Input placeholder="Phone Number" />
                </Form.Item>
                <Form.Item 
                    name="email"
                    rules={[
                        {   
                            type:"email",
                            required:true,
                            message:"Enter a valid email"
                        }
                    ]}
                    >
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item 
                    name="address"
                    rules={[
                        {
                            required:true,
                            message:"Address is required"
                        }
                    ]}
                    >
                    <Input placeholder="Address" />
                </Form.Item>
                <section className="w-full flex justify-center gap-2">

                <Button onClick={() => setIsModal(false)}> Cancel </Button>
                <Button type="primary" htmlType="submit"> Save </Button>
                </section>
            </Form>
        </Modal>
    );
}
