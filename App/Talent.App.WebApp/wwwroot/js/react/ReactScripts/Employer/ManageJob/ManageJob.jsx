import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { Pagination, Card, Button, Icon, Dropdown, Checkbox, Accordion, Form, Segment } from 'semantic-ui-react';

export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        //console.log(loader)
        this.state = {
            loadJobs: [],
            loaderData: loader,
            activePage: 1,
            sortBy: {
                date: "desc"
            },
            filter: {
                showActive: true,
                showClosed: false,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
            totalPages: 1,
            activeIndex: ""
        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        //your functions go here
    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this

        //set loaderData.isLoading to false after getting data
        //this.loadData(() =>
        //    this.setState({ loaderData })
        //)
        
        //console.log(this.state.loaderData)
    }

    componentDidMount() {
        this.init();
        this.loadData();
        console.log("in mount: ", this.state.loadJobs)
    };

    handleJobClose(jobId) {
        var cookies = Cookies.get('talentAuthToken');
        console.log("in handleJobClose: jobId: ", jobId)
        $.ajax({
            url: 'https://talenttal0129.azurewebsites.net/listing/listing/closeJob',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(jobId),
            success: (res) => {
                if (res.success === true) {
                    // delete the card
                    this.setState(prevState => ({
                        loadJobs: prevState.loadJobs.filter(job => job.id !== jobId)
                    }));
                    console.log("Job closed successfully");
                } else {
                    console.log("Error closing job: ", res.message);
                    TalentUtil.notification.show(res.message, "error", null, null);
                }
            },
            error: (error) => {
                console.log("Error closing job: ", error);
                TalentUtil.notification.show("Error closing job", "error", null, null);
            }
        });
    };

    loadData() {
        // var link = 'https://talenttal0129.azurewebsites.net/listing/listing/getSortedEmployerJobs';
        var link = 'https://talenttal0129.azurewebsites.net/listing/listing/getEmployerJobs';
        var cookies = Cookies.get('talentAuthToken');

        $.ajax({
            url: link,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                if (res.success === true) {
                    // Assuming the response is an array of job data
                    console.log("new my Jobs in ajax, res.jobData: ", res.myJobs);
                    this.setState({ loadJobs: res.myJobs });
                } else {
                    TalentUtil.notification.show(res.message, "error", null, null);
                }
            }.bind(this),
            error: function (error) {
                TalentUtil.notification.show("Error fetching jobs", "error", null, null);
            }
        });
    }

    loadNewData(data) {
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                })
            })
        });
    }

    renderJobs() {

        if (!this.state.loadJobs || this.state.loadJobs.length === 0) {
            // [] return data
            return (
                <div>
                    <strong style={{fontSize: '20px'}}>List of Jobs</strong>
                    <br />
                    <br />
                    <Icon name='filter' /> Filter: <b>Choose filter</b> <Icon name='caret down' />
                    <Icon name='calendar' /> Sort by date: <b>Newest first</b> <Icon name='caret down' />
                    <br />
                    <br />
                    No Jobs Found
                </div>
            );
        }

        const cardContainerStyle = {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between', // Adjust alignment between cards
        };

        const cardStyle = {
            width: '48%',
            height: '30%',
            marginBottom: '10px',
            padding: '10px',
            border: '1px solid #ccc',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        };

        return (
            <div style={cardContainerStyle}>
                {this.state.loadJobs.map(job => (
                    <Card key={job.id} style={cardStyle}>
                        <Card.Content>
                            <Card.Header>{job.title}</Card.Header>
                            <Card.Meta>{job.location.city}, {job.location.country}</Card.Meta>
                            <Card.Description>{job.description}</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Button color='red' onClick={() => this.handleJobClose(job.id)}>Expired</Button>
                            <div className="ui right floated buttons">
                                <Button basic color='blue'>
                                    <Icon name='edit' /> Edit
                                </Button>
                                <Button basic color='blue'>
                                    <Icon name='close' /> Close
                                </Button>
                                <Button basic color='blue'>
                                    <Icon name='copy' /> Copy
                                </Button>
                            </div>
                        </Card.Content>
                    </Card>
                ))}
            </div>
        );

    }

    render() {
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <div className="ui container">
                    {this.renderJobs()}
                </div>
            </BodyWrapper>
        )
    }
}