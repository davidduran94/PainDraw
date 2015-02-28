package Controlador;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import LogicaNegocio.UsuarioDAO;

/**
 * Servlet implementation class ControladorLogin
 */
@WebServlet("/ControladorLogin")
public class ControladorLogin extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ControladorLogin() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		try{
			HttpSession sesion = request.getSession();
			//String nombreUsuario = sesion.getAttribute("NombreUsuario").toString();
		String form = request.getParameter("form");
		UsuarioDAO udao = new UsuarioDAO();
		boolean	sesionActiva = true;
		if(sesionActiva){
			if(form.equals("REGISTRO")){
				String nombreUsuario = request.getParameter("txtNombreRegistro");
				String correoElectronico = request.getParameter("txtCorreoRegistro");
				String pass = request.getParameter("txtPassRegistro");
				String confirmarPass = request.getParameter("txtConfirmarPassRegistro");
				String respuesta = udao.registrar(nombreUsuario, correoElectronico, pass, confirmarPass);
				PrintWriter out = response.getWriter();
				response.setContentType("txt/plain");
				System.out.println(respuesta);
				out.write(respuesta);
			}
			else if(form.equals("RECUPERAR")){
				String nombreUsuario = request.getParameter("txtNombreRecuperar");
				String respuesta = udao.recuperar(nombreUsuario);
				PrintWriter out = response.getWriter();
				response.setContentType("txt/plain");
				System.out.println(respuesta);
				out.write(respuesta);
			}
			else if(form.equals("LOGIN")){
				String nombreUsuario = request.getParameter("txtNombreLogin");
				String pass = request.getParameter("txtPassLogin");
				String respuesta = udao.login(nombreUsuario, pass);
				sesion.setAttribute("NombreUsuario", nombreUsuario);
				System.out.println(respuesta);
				response.setContentType("txt/plain");
				PrintWriter out = response.getWriter();
				out.write(respuesta);
			}
			else if (form.equals("SALIR")){
				sesion.setAttribute("NombreUsuario", null);
				sesionActiva = false;
				response.setContentType("txt/plain");
				PrintWriter out = response.getWriter();
				out.write("Sesion cerrada");
			}
		}
		else{
			sesion.setAttribute("NombreUsuario", null);
			response.setContentType("txt/plain");
			PrintWriter out = response.getWriter();
			out.write("Su sesión ha caducado, vuelva a iniciarla");
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
