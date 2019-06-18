import React from "react";
import { DynamicFormContainer } from "components/DynamicForm";
import AssignedOwner from "./AssignedOwner.data";
import "./AssignedOwner.scss";

class Owner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: false,
            users: {},
            userId: null,
            editModeVisible: false,
        };
    }
    componentDidUpdate = prevProps => {
        // fetch all of users citations
        if (prevProps.user !== this.props.user) {
            if (this.props.user.id) {
                this.getAssignedOwner()
            }
        }
    };

    getAssignedOwner = () => {
        let userId = this.props.user.id;
        this.setState({ userId });
        // return getAssignedOwner(userId, this.onSuccess, this.onError);
    }

    onSuccess = data => {
        this.setState({ loading: false, citations: data });
    };

    onError = errorMessage => {
        this.setState({ error: errorMessage, loading: false });
    };

    postFormData = (formData) => {
        this.setState({ loading: true, error: null });
        let { userId } = this.state;
        if (formData.participant_id) {
            //   return updateCitation(
            //     { id: userId, data: formData, citationId: formData.id },
            //     this.onSuccess,
            //     this.onError
            //   );
        }
        // return addCitation(
        //     { id: userId, data: formData },
        //     this.onSuccess,
        //     this.onError
        // );
        this.toggleEdit()
    };

    toggleEdit = () => {
        this.setState({ editModeVisible: !this.state.editModeVisible })
    }

    renderOwner = () => {
        let { users, editModeVisible } = this.state;
        let description = users.description ? users.description : "Owner!!!";

        if (editModeVisible) {
            return (
                <div className="assigned-owner-form">
                    <DynamicFormContainer
                        key={`${users.participant_id}_${users.id}`}
                        initialData={users}
                        questions={AssignedOwner}
                        editableMode={true}
                        onSubmit={this.postFormData}
                    />
                </div>
            );
        }
        return (
            <div className='assigned-owner-form'>
                <div className='assigned-owner-form'>{description}</div>
                <button className='user-card--edit-btn' onClick={(e) => this.toggleEdit(e)}>Edit</button>
            </div>
        )
    };
    render() {
        return (
            <section className="assigned-owner-container">
                <div className="assigned-owner-title">Assigned Owner!</div>
                <div className="assigned-owner-form-container">{this.renderOwner()}</div>
            </section>
        );
    }
}

export default Owner;
