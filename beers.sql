--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6 (Ubuntu 16.6-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.6 (Ubuntu 16.6-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: beers; Type: TABLE; Schema: public; Owner: francisco
--

CREATE TABLE public.beers (
    cerveceria character varying(255) NOT NULL,
    origen character varying(100),
    estilo character varying(100),
    alcohol numeric(4,2),
    premios text,
    ibu integer,
    id integer NOT NULL
);


ALTER TABLE public.beers OWNER TO francisco;

--
-- Name: beers_id_seq; Type: SEQUENCE; Schema: public; Owner: francisco
--

CREATE SEQUENCE public.beers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.beers_id_seq OWNER TO francisco;

--
-- Name: beers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: francisco
--

ALTER SEQUENCE public.beers_id_seq OWNED BY public.beers.id;


--
-- Name: beers id; Type: DEFAULT; Schema: public; Owner: francisco
--

ALTER TABLE ONLY public.beers ALTER COLUMN id SET DEFAULT nextval('public.beers_id_seq'::regclass);


--
-- Data for Name: beers; Type: TABLE DATA; Schema: public; Owner: francisco
--

COPY public.beers (cerveceria, origen, estilo, alcohol, premios, ibu, id) FROM stdin;
\.


--
-- Name: beers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: francisco
--

SELECT pg_catalog.setval('public.beers_id_seq', 2, true);


--
-- Name: beers beers_pkey; Type: CONSTRAINT; Schema: public; Owner: francisco
--

ALTER TABLE ONLY public.beers
    ADD CONSTRAINT beers_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

