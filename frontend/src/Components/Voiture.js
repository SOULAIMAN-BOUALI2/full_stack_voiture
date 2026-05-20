import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Col, Row } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faSave, faUndo, faEdit, faList } from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast';

const Voiture = () => {
    const [voiture, setVoiture] = useState({
        marque: '',
        modele: '',
        couleur: '',
        immatricule: '',
        annee: '',
        prix: ''
    });
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios.get("http://localhost:9090/api/voitures/" + id)
                .then(response => {
                    if (response.data) {
                        setVoiture(response.data);
                    }
                })
                .catch(error => {
                    axios.get("http://localhost:9090/voitures/" + id)
                        .then(res => setVoiture(res.data))
                        .catch(err => console.error("Error fetching voiture:", err));
                });
        }
    }, [id]);

    const voitureChange = (event) => {
        const { name, value } = event.target;
        setVoiture({ ...voiture, [name]: value });
    };

    const submitVoiture = (event) => {
        event.preventDefault();

        const voitureData = {
            marque: voiture.marque,
            modele: voiture.modele,
            couleur: voiture.couleur,
            immatricule: voiture.immatricule,
            annee: voiture.annee,
            prix: voiture.prix
        };

        if (id) {
            // Update
            axios.put("http://localhost:9090/api/voitures/" + id, voitureData)
                .then(response => {
                    if (response.data != null) {
                        setShow(true);
                        setType("success");
                        setMessage("Voiture modifiée avec succès.");
                        setTimeout(() => setShow(false), 3000);
                        setTimeout(() => navigate("/list"), 2000);
                    }
                })
                .catch(error => {
                    axios.put("http://localhost:9090/voitures/" + id, voitureData)
                        .then(res => {
                            setShow(true);
                            setType("success");
                            setMessage("Voiture modifiée avec succès.");
                            setTimeout(() => setShow(false), 3000);
                            setTimeout(() => navigate("/list"), 2000);
                        })
                        .catch(err => {
                            console.error("Error updating voiture:", err);
                            setShow(true);
                            setType("danger");
                            setMessage("Erreur lors de la modification.");
                        });
                });
        } else {
            // Save
            axios.post("http://localhost:9090/api/voitures", voitureData)
                .then(response => {
                    if (response.data != null) {
                        setShow(true);
                        setType("success");
                        setMessage("Voiture enregistrée avec succès.");
                        setTimeout(() => setShow(false), 3000);
                        resetVoiture();
                    }
                })
                .catch(error => {
                    axios.post("http://localhost:9090/voitures", voitureData)
                        .then(res => {
                            setShow(true);
                            setType("success");
                            setMessage("Voiture enregistrée avec succès.");
                            setTimeout(() => setShow(false), 3000);
                            resetVoiture();
                        })
                        .catch(err => {
                            console.error("Error saving voiture:", err);
                            setShow(true);
                            setType("danger");
                            setMessage("Erreur lors de l'enregistrement.");
                        });
                });
        }
    };

    const resetVoiture = () => {
        setVoiture({
            marque: '',
            modele: '',
            couleur: '',
            immatricule: '',
            annee: '',
            prix: ''
        });
    };

    return (
        <div>
            <div style={{ display: show ? "block" : "none" }}>
                <MyToast show={show} message={message} type={type} />
            </div>
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>
                    <FontAwesomeIcon icon={id ? faEdit : faPlusSquare} /> {id ? "Modifier Voiture" : "Ajouter Voiture"}
                </Card.Header>

                <Form onSubmit={submitVoiture} id="voitureFormId">
                    <Card.Body>
                        <Row className="mb-3">
                            <Col>
                                <Form.Label>Marque</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="marque"
                                    value={voiture.marque}
                                    onChange={voitureChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Entrer marque voiture"
                                />
                            </Col>
                            <Col>
                                <Form.Label>Modele</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="modele"
                                    value={voiture.modele}
                                    onChange={voitureChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Entrer modele voiture"
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Label>Couleur</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="couleur"
                                    value={voiture.couleur}
                                    onChange={voitureChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Entrer couleur voiture"
                                />
                            </Col>
                            <Col>
                                <Form.Label>Immatricule</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="immatricule"
                                    value={voiture.immatricule}
                                    onChange={voitureChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Entrer immatricule"
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                                <Form.Label>Annee</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    name="annee"
                                    value={voiture.annee}
                                    onChange={voitureChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Entrer annee"
                                />
                            </Col>
                            <Col>
                                <Form.Label>Prix</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    name="prix"
                                    value={voiture.prix}
                                    onChange={voitureChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Entrer prix"
                                />
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer style={{ textAlign: "right" }}>
                        <Button size="sm" variant="success" type="submit">
                            <FontAwesomeIcon icon={faSave} /> {id ? "Update" : "Submit"}
                        </Button>{' '}
                        <Button size="sm" variant="info" type="reset" onClick={resetVoiture}>
                            <FontAwesomeIcon icon={faUndo} /> Reset
                        </Button>{' '}
                        <Button size="sm" variant="info" type="button" onClick={() => navigate("/list")}>
                            <FontAwesomeIcon icon={faList} /> Liste des Voitures
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        </div>
    );
};

export default Voiture;
