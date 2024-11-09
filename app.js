// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUEwfAl_zV1jh46GROk5_3UwYN3pbTYKs",
  authDomain: "vagas-capixaba.firebaseapp.com",
  projectId: "vagas-capixaba",
  storageBucket: "vagas-capixaba.firebasestorage.app",
  messagingSenderId: "843279287692",
  appId: "1:843279287692:web:81a99238c393b5869a82a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
async function fetchVagas() {
    try {
        // Referência à coleção "vagas" no Firestore
        const vagasCollection = collection(db, "vagas");
        const vagaSnapshot = await getDocs(vagasCollection); // Obtém os documentos da coleção
        const vagasList = vagaSnapshot.docs.map(doc => doc.data()); // Extrai os dados de cada vaga

        // Exibir as vagas na página
        const vagasContainer = document.getElementById('vagas-container');
        vagasContainer.innerHTML = ""; // Limpa o conteúdo do container antes de exibir

        // Para cada vaga, criar um elemento HTML e exibi-lo
        vagasList.forEach(vaga => {
            const vagaElement = document.createElement("div");
            vagaElement.classList.add("vaga");

            vagaElement.innerHTML = `
                <h2>${vaga.titulo}</h2>
                <p><strong>Descrição:</strong> ${vaga.descricao}</p>
                <p><strong>Salário:</strong> R$${vaga.salario}</p>
                <p><strong>Localização:</strong> ${vaga.localizacao}</p>
                <p><strong>Requisitos:</strong> ${vaga.requisitos}</p>
            `;
            
            vagasContainer.appendChild(vagaElement);
        });
    } catch (error) {
        console.error("Erro ao buscar vagas:", error);
    }
}

// Chama a função para buscar e exibir as vagas ao carregar a página
fetchVagas();

