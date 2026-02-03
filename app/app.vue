<template >
    <v-app>
      <topbar></topbar>
      <NuxtPage />
  
    </v-app>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');


*{
  font-family: Poppins;
}
.logoB {
  width: 40px;
  height: 40px;
  margin-top: 5px;
  margin-right: 10px; 
  margin-left: 10px; 
}

.title {
  text-align: left;
  margin: 0; 
  color: white;
  font-size: 20px;
}
.bg-sampol{
  background-color: #0065bd;
}
.content_center{
  width: 60%;
  margin: 10px auto;
}

.h50_card{
  height: 120px;
}

.h2-text{
  font-size: 25px;
  color: #0065BD;
  font-weight: 400;
  text-transform:uppercase;
}
.helper {
  color: #999999;
  margin-bottom: 10px;
}

.card-title {
  color: #005CB9;
  text-align: center;
  margin-bottom: 20px;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 20px;
  margin-top: 20px;
}

.card-subtitle{
  color:#005CB9;
  font-weight: 400;
  text-decoration: underline;
  text-transform: uppercase;
  font-size: 18px;
}

.required {
  color: rgb(243, 30, 30);
  margin-left: 10px;
}

h4{
  font-size: 14px;
  font-weight: 450;
  margin-top: 10px;
  margin-bottom: 5px;
}



h3{
  font-size: 15px;
  font-weight: 550;
  margin-top: 10px;
  text-transform: uppercase;
  color: #005CB9
}

.stepperConfig{
  box-shadow: none; 
  border-radius: 12px;
  width: 80%; 
  margin: 0 auto;

}










.backflip {
  animation: backflip-animation 1s ease;
}

.card-start {
  width: 100%;
  height: 100%;
  background-color: #f1f1f1;
  /* display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  padding-top: 0px;
  background-color: rgb(245, 243, 243);  */
}

/* Estilos de la tarjeta personalizada */
.custom-card {
  display: flex;
  width: 800px;
  height: 500px;
  margin: 10% auto;
  border-radius: 4px; /* Reducimos aún más el border-radius */
  transition: transform 0.5s ease, opacity 0.5s ease; /* Agregamos la transición de opacidad */
  animation: slideIn 0.5s ease; /* Aplicamos la animación de desplazamiento */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
  overflow: hidden; /* Aseguramos que el contenido no se desborde */
  position: relative; 
  background-color: white;
}

.animate-slide-up-fade-out {
  opacity: 0; /* Establece la opacidad en 0 */
  transition: transform 0.5s ease, opacity 0.5s ease; /* Aplica la transición para ambas propiedades */
}

.custom-card:hover {
  transform: perspective(1000px) rotateX(2deg);
}

/* Barra azul en la parte superior */
.custom-card::before {
  content: '';
  width: 100%;
  height: 20px; /* Duplicamos la altura de la barra azul */
  background-color: #005cb9; /* Color azul */
  position: absolute;
  top: 0;
  left: 0;
}

.left-card {
  width: 60%; /* Ajusta el tamaño del contenedor izquierdo para que sea menos de la mitad */
  height: 100%; /* Asegura que tome toda la altura de la tarjeta */
  overflow: hidden; /* Aseguramos que el contenido no se desborde */
  display: flex;
  justify-content: center;
  align-items: center;
}

.right-card {
  width: 40%; /* Ajusta el tamaño del contenedor derecho para que sea más grande */
  height: 100%; /* Asegura que tome toda la altura de la tarjeta */
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  color: #005cb9; /* Color de texto igual que el botón */
}

.right-card h2 {
  margin-top: 0;
  font-size: 0.5cm;
  text-align: center;
  color: #005cb9; /* Color de texto igual que el botón */
}

.logo-letras {
  display: flex; /* Ajusta el ancho de la imagen según sea necesario */
  height: 150px; /* Mantén la proporción de la imagen */
  margin-bottom: 10px; /* Espacio entre la imagen y el texto */
}

.right-card-down {
  margin-top: 20px;
}

.StartButton {
  box-shadow: 0 0px 3px  #005cb9;
}

.logo {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ajusta la imagen para que cubra el contenedor sin distorsionarse */
  border-top-left-radius: 4px; /* Aplica bordes redondeados a la imagen */
  border-bottom-left-radius: 4px; /* Aplica bordes redondeados a la imagen */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
}

/* Ajuste para imágenes en pantallas pequeñas */
@media (max-width: 800px) {
  .custom-card {
    flex-direction: column; /* Cambia a columna en pantallas pequeñas */
    height: 500px; /* Ajustamos la altura */
    width: 90%; /* Ajustamos el ancho para pantallas pequeñas */
    border-radius: 4px;
  }

  .left-card {
    width: 100%; /* La imagen ocupa todo el ancho */
    height: 200px; /* Ajustamos la altura */
    max-height: 200px; /* Establecemos una altura máxima */
    padding-top: 10px; /* Ajustamos el padding superior */
  }

  .right-card {
    width: 100%; /* El texto ocupa todo el ancho */
    height: auto;
    padding: 10px;
    margin-bottom: 50px;
    border-radius: 0 0 4px 4px; /* Ajustamos el borde redondeado solo en la parte inferior */
  }

  .logo {
    border-radius: 4px 4px 0 0; /* Ajustamos el borde redondeado solo en la parte superior */
    height: 100%; /* Asegura que la imagen ocupe toda la altura disponible */
    max-height: 200px; /* Establecemos una altura máxima */
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.4);
  }

  .logo-letras {
    width: 100%; /* Ajustamos el tamaño del logo letras en pantallas pequeñas */
  }
}

.stepper-container {
  margin-top: 20px; /* Ajuste del margen superior */
}

/* Agrega una clase para la animación de aparición del formulario */
.fade-in {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}


</style>