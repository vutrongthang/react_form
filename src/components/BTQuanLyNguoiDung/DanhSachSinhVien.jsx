import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { deleteUser } from '../../store/actions'

class DanhSachSinhVien extends Component {
    render() {
        const { mangNguoiDung } = this.props
        // console.log(mangNguoiDung)
        return (
            <div className="mt-10">
                <div className="p-5 bg-black text-white text-2xl">Danh sách sinh viên</div>
                <div>
                    <table className="w-full p-6 text-xs text-left whitespace-nowrap mt-10">
                        <thead className="bg-gray-700 p-5 text-white text-lg">
                            <tr className="">
                                <th className="p-3">Mã Sinh Viên</th>
                                <th className="p-3">Họ tên</th>
                                <th className="p-3">Số điện thoại</th>
                                <th className="p-3">Email</th>
                            </tr>
                        </thead>
                        <tbody className="border-b text-lg">
                            {mangNguoiDung.map((item, index) => (
                                <tr key={item.id}>
                                    {/* <td>{index + 1}</td> */}
                                    <td>{item.userName}</td>
                                    <td>{item.fullName}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <button
                                            className="p-4 rounded-lg mr-4 bg-red-500"
                                            onClick={() => {
                                                this.props.dispatch({
                                                    type: 'DELETE_USER',
                                                    payload:item.id,
                                                });
                                            }}
                                        >
                                            Xoá
                                        </button>
                                        <button
                                            className="p-4 rounded-lg bg-green-500"
                                            onClick={() => {
                                                this.props.dispatch({
                                                    type: 'EDIT_USER',
                                                    payload: item.id,
                                                })
                                            }}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        mangNguoiDung: state.baiTapQuanLyNguoiDung.mangNguoiDung,
    }
}

export default connect(mapStateToProps)(DanhSachSinhVien)
