import React, {Component} from "react";
import { Navbar, Input, Button, InputGroup, InputGroupAddon, Container, Col, Form, Row} from "reactstrap";
import { MdSearch, MdStar } from "react-icons/md";
import axios from "axios"
import {Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Spinner} from 'reactstrap';
import { Link } from "react-router-dom"


class Home extends  Component {

    state = {
        meteoro: [],
        carregando: false
    }
    

    
    meteoro = async (event) => {
        this.setState({carregando: true})
        event.preventDefault()
        const form = event.target
        const inputGroup = form.children[0]
        const input = inputGroup.children[0]
        

        //const {seguidores:data} = await axios(`https://api.github.com/users/${input.value}/followers`)

        const meteoro = await axios(`https://api.nasa.gov/planetary/apod?date=${input.value}&api_key=d7JUUnol5xxBb0ERh2BPfEJtU95fdPzT1dbvSZkp`)
        //this.setState({seguidores : seguidores.data})
        this.setState({meteoro: [meteoro.data, ...this.state.meteoro], carregando: false})
        
    }




    
    render() {
        return (
            <>
                <Navbar color="dark">
                        <Container className="justify-content-center">
                            
                                <img src="https://www.thispersondoesnotexist.com/image" 
                                    className="rounded-circle border border-white mr-1" 
                                    alt="pessoa aleatoria"
                                     width="70"
                                     />
                                <span className="text-white ml-3">
                                    Logado como
                                    <Link className="text-white font-weigth-bold ml-3" to="/">
                                    { this.props.match.params.usuario }
                                    </Link>
                                </span>
                            
                        </Container>
                </Navbar>


                
                <Navbar color="dark" fixed="bottom">
                    <Container className="justify-content-center">
                        <Col xs="12" md="6">
                            <Form onSubmit={this.meteoro}>
                                <InputGroup>
                                    <Input type="date"/>
                                    <InputGroupAddon addonType="append" >
                                        <Button color="danger">
                                            {this.state.carregando ? (<Spinner color="light" size="sm" /> ) : (<MdSearch size="22"/>) }
                                        </Button>
                                    </InputGroupAddon>                          
                                </InputGroup>
                            </Form>
                        </Col>
                    </Container>
                </Navbar>
                

                { this.state.carregando ? (
                <Container className="h-100 d-flex flex-column justify-content-center align-items-center">
                    <Spinner color="dark" size="lg"/>
                    <span>Carregando...</span>
                </Container>
                ) : (
                    <Container  className="mt-4 mb-5">
                <Row>
                {this.state.meteoro.map((meteoro) => (
                    <Col xs="12" md="3" lg="4" className="d-flex">
                    <Card color="dark" className="text-white mb-5">
                        <CardImg height="30%" src={meteoro.url} alt={meteoro.title} />
                        <CardBody>
                            <CardTitle className="h3 text-center">{meteoro.title}</CardTitle>
                            <CardSubtitle className="text-muted text-center">{meteoro.date.split("-").reverse().join("/")}</CardSubtitle>
                            <CardText  className="text-justify">{meteoro.explanation}</CardText>
                        </CardBody>
                    </Card>
                    </Col>
                ))}
                </Row>
                </Container>
                )
                    
            }

               {/* /* { this.state.carregando && (
                <Container className="h-100 d-flex flex-column justify-content-center align-items-center">
                    <Spinner color="dark" size="lg"/>
                    <span>Carregando...</span>
                </Container>
                )}
               */}



            {this.state.meteoro.length === 0 && (
                <Container className="h-100 d-flex flex-column justify-content-center align-items-center">
                <h2>Digite uma data</h2>
                <MdStar className="mb-5" color="dark" size="250"/>
            </Container>
            )}
            </>
        )
    }
}

export default Home;