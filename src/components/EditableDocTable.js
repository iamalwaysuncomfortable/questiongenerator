import React, { Component } from 'react';
import {DataTable} from 'primereactcomponents/datatable/DataTable';
import {Column} from 'primereactcomponents/column/Column';
import {InputText} from 'primereactcomponents/inputtext/InputText';
import {Dropdown} from 'primereactcomponents/dropdown/Dropdown';
import {Calendar} from 'primereactcomponents/calendar/Calendar';

export class DataTableEditDemo extends Component {

    constructor(props) {
        super(props);

    }

    onEditorValueChange(props, value) {
        let questions = [...props.value];
        questions[props.rowIndex][props.field] = value;
        this.setState({cars: updatedCars});
    }

    inputTextEditor(props, field) {
        return <InputText type="text" value={props.rowData.year} onChange={(e) => this.onEditorValueChange(props, e.target.value)} />;
    }

    vinEditor(props) {
        return this.inputTextEditor(props, 'vin');
    }

    requiredValidator(props) {
        let value = props.rowData[props.field];
        return value && value.length > 0;
    }

    render() {
        return (
            <div>
                <div className="content-section implementation">
                    <DataTable value={this.state.cars} editable={true}>
                        <Column field="vin" header="Vin" editor={this.vinEditor} editorValidator={this.requiredValidator} style={{height: '3.5em'}}/>
                        <Column field="year" header="Year" editor={this.yearEditor} style={{height: '3.5em'}}/>
                        <Column field="brand" header="Brand" editor={this.brandEditor} style={{height: '3.5em'}}/>
                        <Column field="color" header="Color" editor={this.colorEditor} style={{height: '3.5em'}}/>
                    </DataTable>
                </div>
            </div>
        );
    }
}
