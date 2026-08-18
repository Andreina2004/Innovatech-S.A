import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient(); 
const PORT = 3000;

// Configuración de CORS para aceptar peticiones desde la app móvil (Expo Web)
app.use(cors({ 
  origin: ['http://localhost:8081', 'http://localhost:8082'] 
}));

app.use(express.json());

// Tu ruta de bienvenida
app.get('/', (req, res) => {
  res.send('¡Hola Andreina! El servidor de Innovatech está funcionando perfectamente 🚀');
});

// ==========================================
//          RUTA DE LOGIN (NUEVA)
// ==========================================
app.post('/login', async (req, res) => {
    const { email } = req.body;
    try {
        const empleado = await prisma.empleado.findUnique({
            where: { correo: email }
        });

        if (empleado) {
            res.status(200).json({ 
                success: true, 
                message: "Login exitoso", 
                empleado 
            });
        } else {
            res.status(401).json({ 
                success: false, 
                message: "El correo no está registrado" 
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Error en el servidor" });
    }
});

// ==========================================
//          CRUD PARA EMPLEADOS
// ==========================================
app.get('/empleados', async (req, res) => {
  try {
    const empleados = await prisma.empleado.findMany();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los empleados' });
  }
});

app.post('/empleados', async (req, res) => {
  try {
    const { nombre, correo, rol } = req.body;
    const nuevoEmpleado = await prisma.empleado.create({
      data: { nombre, correo, rol }
    });
    res.status(201).json(nuevoEmpleado);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el empleado' });
  }
});

app.put('/empleados/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, rol } = req.body;
    const empleadoActualizado = await prisma.empleado.update({
      where: { id_empleado: Number(id) },
      data: { nombre, correo, rol }
    });
    res.json(empleadoActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el empleado' });
  }
});

app.delete('/empleados/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.empleado.delete({
      where: { id_empleado: Number(id) }
    });
    res.json({ mensaje: 'Empleado eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el empleado' });
  }
});

// ==========================================
//          CRUD PARA PROYECTOS
// ==========================================
app.get('/proyectos', async (req, res) => {
  try {
    const proyectos = await prisma.proyecto.findMany();
    res.json(proyectos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los proyectos' });
  }
});

app.post('/proyectos', async (req, res) => {
  try {
    const datosProyecto = req.body; 
    const nuevoProyecto = await prisma.proyecto.create({
      data: datosProyecto
    });
    res.status(201).json(nuevoProyecto);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el proyecto' });
  }
});

app.put('/proyectos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizar = req.body;
    const proyectoActualizado = await prisma.proyecto.update({
      where: { id_proyecto: Number(id) },
      data: datosActualizar
    });
    res.json(proyectoActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el proyecto' });
  }
});

app.delete('/proyectos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.proyecto.delete({
      where: { id_proyecto: Number(id) }
    });
    res.json({ mensaje: 'Proyecto eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el proyecto' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor de Innovatech corriendo en http://localhost:${PORT}`);
});