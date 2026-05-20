import React, { Component } from 'react';
import { Card, Table, ButtonGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class VoitureListe extends Component {

    constructor(props) {
        super(props);

        this.state = {
            voitures: []
        };
    }

    componentDidMount() {

        axios.get("http://localhost:9090/api/voitures")
            .then(response => {
                if (response.data._embedded && response.data._embedded.voitures) {
                    this.setState({ voitures: response.data._embedded.voitures });
                } else {
                    this.setState({ voitures: response.data });
                }
            })
            .catch(error => {
                console.error("Error fetching voitures:", error);
                // Fallback to non-api path if /api/ fails
                axios.get("http://localhost:9090/voitures")
                    .then(res => this.setState({ voitures: res.data }))
                    .catch(err => console.error("Error fetching from /voitures:", err));
            });
    }

    deleteVoiture = (voitureId) => {

        axios.delete("http://localhost:9090/api/voitures/" + voitureId)
            .then(response => {
                alert("Voiture supprimée avec succès.");
                this.setState({
                    voitures: this.state.voitures.filter(
                        voiture => voiture.id !== voitureId
                    )
                });
            })
            .catch(error => {
                // Try non-api path
                axios.delete("http://localhost:9090/voitures/" + voitureId)
                    .then(res => {
                        alert("Voiture supprimée avec succès.");
                        this.setState({
                            voitures: this.state.voitures.filter(
                                voiture => voiture.id !== voitureId
                            )
                        });
                    })
                    .catch(err => {
                        console.error("Error deleting voiture:", err);
                        alert("Erreur lors de la suppression.");
                    });
            });
    };

    render() {

        return (
            <Card className={"border border-dark bg-dark text-white"}>

                <Card.Header>
                    <FontAwesomeIcon icon={faList} /> Liste des Voitures
                </Card.Header>

                <Card.Body>

                    <Table bordered hover striped variant="dark">

                        <thead>
                            <tr>
                                <th>Marque</th>
                                <th>Modele</th>
                                <th>Couleur</th>
                                <th>Immatricule</th>
                                <th>Annee</th>
                                <th>Prix</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {
                                this.state.voitures.length === 0 ?

                                    <tr align="center">
                                        <td colSpan="7">
                                            Aucune Voiture Disponible.
                                        </td>
                                    </tr>

                                    :

                                    this.state.voitures.map((voiture) => (
                                        <tr key={voiture.id}>

                                            <td>{voiture.marque}</td>
                                            <td>{voiture.modele}</td>
                                            <td>{voiture.couleur}</td>
                                            <td>{voiture.immatricule}</td>
                                            <td>{voiture.annee}</td>
                                            <td>{voiture.prix}</td>

                                            <td>
                                                <ButtonGroup>

                                                    <Link
                                                        to={"/edit/" + voiture.id}
                                                        className="btn btn-sm btn-outline-primary"
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Link>{' '}

                                                    <Button
                                                        size="sm"
                                                        variant="outline-danger"
                                                        onClick={this.deleteVoiture.bind(this, voiture.id)}
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </Button>

                                                </ButtonGroup>
                                            </td>

                                        </tr>
                                    ))
                            }

                        </tbody>

                    </Table>

                </Card.Body>

            </Card>
        );
    }
}