import express from 'express'
const router = express.Router()
import multer from 'multer';
const upload = multer({dest:'public/'})

import {    
        abreedtmovimento, 
        edtmovimento, 
        listarusuarios, 
        detalhe, 
        abreaddmovimento,
        deletamovimento, 
        addmovimento, 
        listarmovimento, 
        filtrarmovimento,
        abreaddcontrato,
        addcontrato,
        filtrarlistarusuarios,
        listarcontrato,
        filtrarcontrato,
        deletacontrato,
        abreedtcontrato,
        edtcontrato
    } from '../controllers/admin.js';


router.get("/admin/usuarios/lst", listarusuarios)
router.get("/admin/usuarios/detalhe/:id", detalhe)
router.post('/admin/usuarios/lst', filtrarlistarusuarios)

//create do modelo movimento (create)
router.get('/admin/movimento/add', abreaddmovimento)
router.post('/admin/movimento/add', addmovimento)

//rotas do modelo movimento (read)
router.get('/admin/movimento/lst', listarmovimento)
router.post('/admin/movimento/lst', filtrarmovimento)

//rota do modelo movimento (delete)
router.get('/admin/movimento/del/:id', deletamovimento)

//rota do modelo movimento (editar)
router.get('/admin/movimento/edt/:id', abreedtmovimento)
router.post('/admin/movimento/edt/:id', edtmovimento)

//create do modelo contrato (create)
router.get('/admin/contrato/add', abreaddcontrato)
router.post('/admin/contrato/add', addcontrato)

//rotas do modelo contrato (read)
router.get('/admin/contrato/lst', listarcontrato)
router.post('/admin/contrato/lst', filtrarcontrato)

//rota do modelo contrato (delete)
router.get('/admin/contrato/del/:id', deletacontrato)

//rota do modelo contrato (editar)
router.get('/admin/contrato/edt/:id', abreedtcontrato)
router.post('/admin/contrato/edt/:id', edtcontrato)
export default router