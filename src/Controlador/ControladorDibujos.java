package Controlador;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import LogicaNegocio.DibujosDAO;
import LogicaNegocio.UsuarioDAO;

/**
 * Servlet implementation class ControladorDibujos
 */
@WebServlet("/ControladorDibujos")
public class ControladorDibujos extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ControladorDibujos() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		HttpSession sesion = request.getSession();
		try{
			String nombreUsuario = sesion.getAttribute("NombreUsuario").toString();
			if(nombreUsuario == null){
				response.sendRedirect("login.html");
			}
			else{
				response.sendRedirect("login.html");
			}
		}catch(Exception e){
			response.sendRedirect("login.html");
			e.printStackTrace();
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		try{
		HttpSession sesion = request.getSession();
		String nombreUsuario = sesion.getAttribute("NombreUsuario").toString();
			String form = request.getParameter("form");
			DibujosDAO ddao = new DibujosDAO();
			UsuarioDAO udao = new UsuarioDAO();
			
			if(form.equals("GUARDAR")){
				String nombreDibujo = request.getParameter("txtNombreDibujo");
				String base64 = request.getParameter("txtBase64");
				String respuesta = ddao.guardar(base64, nombreDibujo, nombreUsuario);
				PrintWriter out = response.getWriter();
				response.setContentType("txt/plain");
				System.out.println(respuesta);
				out.write(respuesta);
			}
			else if(form.equals("CARGAR")){
				String nombreDibujo = request.getParameter("txtNombreDibujo");
				String respuesta = ddao.cargar(nombreDibujo, nombreUsuario);
				PrintWriter out = response.getWriter();
				response.setContentType("txt/plain");
				System.out.println(respuesta);
				out.write(respuesta);
			}
			else if(form.equals("SOBREESCRIBIR")){
				String nombreDibujo = request.getParameter("txtNombreDibujo");
				String base64 = request.getParameter("txtBase64");
				String respuesta = ddao.sobreescribir(base64, nombreDibujo, nombreUsuario);
				PrintWriter out = response.getWriter();
				response.setContentType("txt/plain");
				System.out.println(respuesta);
				out.write(respuesta);
			}
			else if(form.equals("CONFIGURAR")){
				String nombreNuevoUsuario = request.getParameter("txtNombreNuevoConfigurar");
				String correoNuevo = request.getParameter("txtCorreoNuevoConfigurar");
				String passAntiguo = request.getParameter("txtPassAntiguoConfigurar");
				String passNuevo = request.getParameter("txtPassNuevoConfigurar");
				String confirmarPassNuevo = request.getParameter("txtConfirmarPassNuevoConfigurar");
				String respuesta;
				if(nombreUsuario != null && nombreNuevoUsuario != null && correoNuevo != null && passAntiguo != null && passNuevo != null && confirmarPassNuevo != null){
					respuesta = udao.configurar(nombreUsuario, nombreNuevoUsuario, correoNuevo, passAntiguo, passNuevo, confirmarPassNuevo);
					sesion.setAttribute("NombreUsuario", nombreNuevoUsuario);
				}else{
					respuesta = "Todos los campos son obligatorios!"; 
				}
				PrintWriter out = response.getWriter();
				response.setContentType("txt/plain");
				System.out.println(respuesta);
				out.write(respuesta);
			}
			else if(form.equals("SALIR")){
				String respuesta;
				sesion.setAttribute("NombreUsuario", null);
				PrintWriter out = response.getWriter();
				response.setContentType("txt/plain");
				respuesta = "Se ha cerrado tu sesión";
				System.out.println(respuesta);
				out.write(respuesta);
			}
			else if(form.equals("NOMBREUSUARIO")){
				
				//hacr funcion para que funcione con usuarios y correos
				String res = sesion.getAttribute("NombreUsuario").toString();
				PrintWriter out = response.getWriter();
				response.setContentType("txt/plain");
				out.write(res);
			}
		}catch(Exception e){
			String respuesta = "Todos los campos son obligatorios!";
			PrintWriter out = response.getWriter();
			response.setContentType("txt/plain");
			System.out.println(respuesta);
			out.write(respuesta);
			e.printStackTrace();
		}
	}

}
