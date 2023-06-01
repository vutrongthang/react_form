import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addUser, updateUser } from '../../store/actions'

class FormDangKy extends Component {
    stateDefault = {
        userName: '',
        fullName: '',
        phoneNumber: '',
        email: '',
    }
    state = {
        values: this.stateDefault,
        errors: {},
    }
    handleState = (event) => {
        const { name, value } = event.target
        this.setState({
            values: {
                ...this.state.values,
                [name]: value,
            },
        })

        // console.log(event.target.value)
        // console.log(event.target.name)
    }

    handleBlur = (event) => {
        const {
            name,
            title,
            validationMessage,
            minLength,
            maxLength,
            validity: { valueMissing, tooShort, patternMismatch },
        } = event.target
        console.log(patternMismatch)
        // const { valueMissing } = validity

        let mess = ''

        if (valueMissing) {
            mess = `${title} không được bỏ trống!`
        }
        if (tooShort) {
            mess = `${title} từ ${minLength} đến ${maxLength} ký tự!`
        }
        if (patternMismatch) {
            mess = `${title} không đúng định dạng!`
        }

        this.setState({
            errors: {
                ...this.state.errors,
                // [name]: validationMessage,
                [name]: mess,
            },
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if (!event.target.checkValidity()) {
            return
        }
        if(this.props.selectedUser){
            this.props.dispatch(updateUser(this.state.values))
        }else {
            this.props.dispatch(addUser(this.state.values))
        }
        
        this.setState({
            values: this.stateDefault,
        })
    }

    // CHuyển props thành state nội bộ của component
    static getDerivedStateFromProps = (nextProps, currentState) => {
        console.log(nextProps, currentState)
        if (nextProps.selectedUser && nextProps.selectedUser.id !== currentState.values.id) {
            currentState.values = nextProps.selectedUser
        }
        return currentState
    }

    render() {
        const { userName, fullName, phoneNumber, email } = this.state.values
        return (
            <div>
                <form
                    id="form"
                    noValidate
                    onSubmit={this.handleSubmit}
                >
                    <div className="p-10 bg-black text-white text-2xl">Thông Tin Sinh Viên</div>
                    <div className="grid grid-cols-2 gap-5 mt-10">
                        <div>
                            <p>Mã Sinh Viên</p>
                            <input
                                type="text"
                                title="Mã Sinh Viên"
                                required
                                value={userName}
                                minLength={4}
                                maxLength={15}
                                name="userName"
                                placeholder="Mã Sinh Viên"
                                className="border-2 border-black  rounded-sm p-3 w-full mt-4"
                                onChange={this.handleState}
                                onBlur={this.handleBlur}
                            />
                            <span className="text-red-500 text-14">
                                {this.state.errors.userName}
                            </span>
                        </div>
                        <div>
                            <p>Họ tên</p>
                            <input
                                required
                                type="text"
                                title="Họ tên"
                                placeholder="Họ tên"
                                value={fullName}
                                name="fullName"
                                className="border-2 border-black  rounded-sm p-3 w-full mt-4"
                                onChange={this.handleState}
                                onBlur={this.handleBlur}
                            />
                            <span className="text-red-500 text-14">
                                {this.state.errors.fullName}
                            </span>
                        </div>
                        <div>
                            <p>Số điện thoại</p>
                            <input
                                type="text"
                                required
                                name="phoneNumber"
                                value={phoneNumber}
                                title="Số điện thoại"
                                placeholder="Số điện thoại"
                                className="border-2 border-black  rounded-sm p-3 w-full mt-4"
                                onChange={this.handleState}
                                onBlur={this.handleBlur}
                            />
                            <span className="text-red-500 text-14">
                                {this.state.errors.phoneNumber}
                            </span>
                        </div>
                        <div>
                            <p>Email</p>
                            <input
                                type="text"
                                // required
                                title="Email"
                                value={email}
                                name="email"
                                pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                                placeholder="Email"
                                className="border-2 border-black  rounded-sm p-3 w-full mt-4"
                                onChange={this.handleState}
                                onBlur={this.handleBlur}
                            />
                            <span className="text-red-500 text-14">{this.state.errors.email}</span>
                        </div>
                    </div>

                    <div className="mt-4">
                        <button
                            type="submit"
                            className={`p-4 bg-green-500 rounded-sm text-white cursor-pointer hover:bg-green-700 mr-4 ${
                                !this.props.selectedUser ? '' : 'hidden'
                            }`}
                        >
                           Thêm Sinh Viên
                        </button>
                        <button
                            type="submit"
                            className={`p-4 bg-yellow-500 rounded-sm text-white cursor-pointer mr-4 hover:bg-yellow-700 ${
                                this.props.selectedUser ?? 'hidden'
                            }`}
                        >
                            Cập nhập
                        </button>
                        <button
                            type="reset"
                            className="p-4 bg-cyan-500 rounded-sm text-white cursor-pointer mx-4 hover:bg-cyan-700"
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        ...state.baiTapQuanLyNguoiDung,
        // mangNguoiDung: state.baiTapQuanLyNguoiDung.mangNguoiDung
    }
}

export default connect(mapStateToProps)(FormDangKy)
