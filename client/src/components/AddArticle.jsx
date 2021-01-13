import React, {useContext, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./Header";
import About from "./About";
import Container from "@material-ui/core/Container";
import Footer from "./Footer";
import {makeStyles} from "@material-ui/core/styles";
import {MyContext} from "../contexts/MyContext";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Input, InputLabel} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
}));

export default function AddArticle() {
    const classes = useStyles();
    const {insertArticle} = useContext(MyContext);

    const initialState = {
        post:{
            title:'',
            body:'',
            image:''
        },
        errorMsg:'',
        successMsg:'',
    }
    const [state,setState] = useState(initialState);

    const styles = {
        hidden: {
            display: "none",
        },
        importLabel: {
            color: "black",
        },
    };

    const submitForm = async (event) => {
        event.preventDefault();
        const data = await insertArticle(state.post.title, state.post.body);

        if(data.success){
            setState({
                ...initialState,
                successMsg:data.message,
            });
        }
        else{
            setState({
                ...state,
                successMsg:'',
                errorMsg:data.message
            });
        }
    }

    const onChangeValue = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setState({
            ...state,
            post:{
                ...state.post,
                [name]:value
            }
        });
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header />
                <Grid item xs={12} md={8}>
                    <Typography component="h1" variant="h3" gutterBottom>
                        Add a new Article
                    </Typography>
                    <Divider />
                    <form onSubmit={submitForm} noValidate>
                        <Typography paragraph={true}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="ftitle"
                                    name="title"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="title"
                                    label="Title"
                                    autoFocus
                                    value={state.post.title}
                                    onChange={onChangeValue}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="body"
                                    label="Body"
                                    name="body"
                                    autoComplete="email"
                                    value={state.post.body}
                                    onChange={onChangeValue}
                                />
                            </Grid>

                            <InputLabel htmlFor="import-button" style={styles.importLabel}>
                                <Input
                                    accept="image/*"
                                    id="import-button"
                                    onChange={onChangeValue}
                                    style={styles.hidden}
                                    name="image"
                                    type="file"
                                />
                                Import Photo with ".jpg" extension
                            </InputLabel>
                            {state.errorMsg}
                            {state.successMsg}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Add Article
                            </Button>
                        </Typography>
                    </form>
                </Grid>
                <Grid container spacing={5} className={classes.mainGrid}>
                    <About />
                </Grid>
            </Container>
            <Footer />
        </React.Fragment>
    );
}