import React, { Component } from 'react';
import { addSession } from '../../services/sessions';

class AddSession extends Component {
    state = {
        values: {
            sequenceId: '',
            name: '',
            speaker: '',
            duration: '',
            level: '',
            abstract: ''
        },
        errors: {
            sequenceId: [],
            name: [],
            speaker: [],
            duration: [],
            level: [],
            abstract: []
        },
        isValid: false
    };

    validate = () => {
        const {
            sequenceId,
            name,
            speaker,
            duration,
            level,
            abstract 
        } = this.state.values;

        const errors = {
            sequenceId: [],
            name: [],
            speaker: [],
            duration: [],
            level: [],
            abstract: []
        }

        let isValid = true;

        // we shall validate the inputs
        if( sequenceId === '' ) {
            errors.sequenceId.push( 'Sequence ID cannot be empty' );
            isValid = false;
        }
        
        if( !/^\d+$/.test( sequenceId ) ) {
            errors.sequenceId.push( 'Sequence ID must be a positive integer' );
            isValid = false;
        }

        if( !/^(Basic|Intermediate|Advanced)$/.test( level ) ) {
            errors.level.push( 'Level must be one of Basic | Intermediate | Advanced' );
            isValid = false;
        }

        this.setState(state => {
            return {
                errors,
                isValid
            };
        });
    }

    updateValue = ( event ) => {
        const { name, value } = event.target;

        this.setState(state => {
            return {
                values: {
                    ...state.values,
                    [name]: value
                }
            }
        });
    }

    componentDidUpdate( prevProps, prevState ) {
        // we want to call this only if values change (not if errors ot=r isValid changes)
        if( prevState.values !== this.state.values ) {
            this.validate();
        }
    }

    // we are "binding" the "this" to the particular "AddSession object"
    addSession = ( event ) => {
        event.preventDefault();

        const session = {
            ...this.state.values
        };

        session.sequenceId = parseInt( session.sequenceId );
        session.duration = parseFloat( session.duration );

        addSession( this.props.id, session )
            .then( response => {
                alert( `Session with id = ${response.data.id} has been added` );
                console.log( response.data );
            })
            .catch(error => alert( `Something went wrong : ${error.message}` ));
    }

    render() {
        const {
            sequenceId,
            name,
            speaker,
            duration,
            level,
            abstract 
        } = this.state.values;

        const {
            sequenceId : sequenceIdErrs,
            name : nameErrs,
            speaker : speakerErrs,
            duration : durationErrs,
            level : levelErrs,
            abstract : abstractErrs
        } = this.state.errors;

        const isValid = this.state.isValid;

        return (
            <div className="container">
                <div className="row my-4">
                    <div className="col-12">
                        <h3>
                            Details of new session
                        </h3>
                        <hr />
                    </div>
                </div>
                <div className="col-12">
                    {/*<form onSubmit={this.addSession}>*/}
                    {/*<form onSubmit={( event ) => this.addSession()}>*/}
                    {/* we are using the bound version set up in the constructor */}
                    <form onSubmit={this.addSession}>
                        <div className="form-group row">
                            <label htmlFor="sequenceId" className="col-sm-3 col-form-label">Sequence ID</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" name="sequenceId" id="sequenceId" placeholder="" aria-describedby="sequenceHelpId" onChange={this.updateValue} value={sequenceId} />
                                <small id="sequenceHelpId" className="text-muted">Sequence ID is the serial number of the session in the workshop</small>
                                <div>{sequenceIdErrs.join( '. ' )}</div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="name" className="col-sm-3 col-form-label">Name</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" name="name" id="name" placeholder=""  aria-describedby="NameHelpId" onChange={this.updateValue} value={name} />
                                <small id="NameHelpId" className="text-muted">The title of the session</small>
                                <div>{nameErrs.join( '. ' )}</div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="speaker" className="col-sm-3 col-form-label">Speaker(s)</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" name="speaker" id="speaker" placeholder="" aria-describedby="speakerHelpId" onChange={this.updateValue} value={speaker} />
                                <small id="speakerHelpId" className="text-muted">The name of the speaker(s) for this session. Separate speaker names by a comma. Example <strong>John Doe, Jane Doe</strong>.</small>
                                <div>{speakerErrs.join( '. ' )}</div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="duration" className="col-sm-3 col-form-label">Duration</label>
                            <div className="col-sm-9">
                                <input type="number" className="form-control" name="duration" id="duration" placeholder="" aria-describedby="durationHelpId" onChange={this.updateValue} value={duration} />
                                <small id="durationHelpId" className="text-muted">The length of the session in hours</small>
                                <div>{durationErrs.join( '. ' )}</div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="level" className="col-sm-3 col-form-label">Level</label>
                            <div className="col-sm-9">
                                <select className="form-control" name="level" id="level" onChange={this.updateValue} value={level}>
                                    <option value="">-- Select the level of the session --</option>
                                    <option value="Basic">Basic</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                                <div>{levelErrs.join( '. ' )}</div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="duration" className="col-sm-3 col-form-label">Abstract</label>
                            <div className="col-sm-9">
                                <textarea type="number" className="form-control" name="abstract" id="abstract"
                                aria-describedby="abstractHelpId" onChange={this.updateValue} value={abstract}></textarea>
                                <small id="abstractHelpId" className="text-muted">A brief description of the session topics</small>
                                <div>{abstractErrs.join( '. ' )}</div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="offset-sm-3 col-sm-9">
                                <button type="submit" className="btn btn-primary mr-2" disabled={!isValid}>Add session</button>
                                <button type="button" className="btn btn-danger">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddSession;