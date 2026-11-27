import type { Metadata } from "next"
import Link from "next/link"
import LegalDocument, {
	ContactEmail,
} from "@/components/shared/LegalDocument/LegalDocument"

export const metadata: Metadata = {
	title: "Política de Privacidade",
	description: "Política de Privacidade da plataforma Luna.",
}

export default function PrivacyPage() {
	return (
		<LegalDocument
			title="Política de Privacidade"
			backHref="/signup"
			backLabel="Voltar ao cadastro">
			<h2>1. Quem somos</h2>
			<p>
				A Luna é operada pelo Grupo LUNA, que atua como controlador dos dados
				pessoais tratados na plataforma, nos termos da Lei Geral de Proteção de
				Dados (LGPD, Lei nº 13.709/2018). Canal para assuntos de privacidade e
				para exercício de direitos: <ContactEmail />.
			</p>
			<p>
				Esta Política complementa os <Link href="/terms">Termos de Uso</Link>.
			</p>

			<h2>2. Quais dados coletamos</h2>
			<p>Coletamos os dados que você mesmo informa ao usar a Luna:</p>
			<table>
				<thead>
					<tr>
						<th>Dado</th>
						<th>Quem pode ver</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Foto de perfil</td>
						<td>Todos os usuários (público)</td>
					</tr>
					<tr>
						<td>Banner</td>
						<td>Todos os usuários (público)</td>
					</tr>
					<tr>
						<td>Nome de usuário</td>
						<td>Todos os usuários (público)</td>
					</tr>
					<tr>
						<td>Bio</td>
						<td>Todos os usuários (público)</td>
					</tr>
					<tr>
						<td>E-mail</td>
						<td>Somente a Luna</td>
					</tr>
					<tr>
						<td>Senha</td>
						<td>
							Armazenada de forma protegida (hash); ninguém, nem a equipe, tem
							acesso a ela
						</td>
					</tr>
				</tbody>
			</table>
			<p>Também tratamos:</p>
			<ul>
				<li>
					o conteúdo que você cria na plataforma (posts, comentários e listas
					de jogos);
				</li>
				<li>o registro do seu aceite, com a versão dos Termos e a data e hora;</li>
				<li>
					dados técnicos necessários ao funcionamento e à segurança do serviço,
					como endereço IP, data e hora de acesso e informações do navegador
					ou dispositivo, que podem ser registrados em logs.
				</li>
			</ul>

			<h2>3. Para que usamos os dados</h2>
			<table>
				<thead>
					<tr>
						<th>Finalidade</th>
						<th>Base legal (LGPD, art. 7º)</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Criar e manter sua conta e permitir o login</td>
						<td>Execução de contrato (inciso V)</td>
					</tr>
					<tr>
						<td>Exibir seu perfil e seus conteúdos aos demais usuários</td>
						<td>Execução de contrato (inciso V)</td>
					</tr>
					<tr>
						<td>
							Enviar comunicações necessárias ao serviço, como recuperação de
							conta e avisos sobre penalidades
						</td>
						<td>Execução de contrato (inciso V)</td>
					</tr>
					<tr>
						<td>
							Moderar a plataforma e aplicar os Termos (denúncias, strikes e
							banimentos)
						</td>
						<td>
							Legítimo interesse (inciso IX) e exercício regular de direitos
							(inciso VI)
						</td>
					</tr>
					<tr>
						<td>
							Garantir a segurança, prevenir fraudes e melhorar o funcionamento
							da Luna
						</td>
						<td>Legítimo interesse (inciso IX)</td>
					</tr>
					<tr>
						<td>Manter registros de acesso exigidos por lei</td>
						<td>Cumprimento de obrigação legal (inciso II)</td>
					</tr>
					<tr>
						<td>Comprovar o aceite dos Termos</td>
						<td>Exercício regular de direitos (inciso VI)</td>
					</tr>
				</tbody>
			</table>

			<h2>4. Dados públicos</h2>
			<p>
				Foto de perfil, banner, nome de usuário e bio são públicos e podem ser
				vistos por qualquer usuário da Luna. O mesmo vale para posts e
				comentários. Não inclua nesses campos informações que você não queira
				tornar públicas.
			</p>

			<h2>5. Segurança da senha e dos dados</h2>
			<p>
				Sua senha é armazenada de forma protegida (hash) e nunca é exibida a
				ninguém. Adotamos medidas técnicas e organizacionais para proteger seus
				dados contra acessos não autorizados, mas nenhum sistema é totalmente
				invulnerável.
			</p>

			<h2>6. Compartilhamento de dados</h2>
			<ul>
				<li>Não vendemos seus dados pessoais.</li>
				<li>Seu e-mail não é exibido a outros usuários.</li>
				<li>
					Podemos compartilhar dados com prestadores de serviços de hospedagem,
					banco de dados e infraestrutura, que os tratam apenas para que a
					plataforma funcione.
				</li>
				<li>
					Podemos divulgar dados quando exigido por lei ou por ordem judicial.
				</li>
			</ul>

			<h2>7. Por quanto tempo guardamos os dados</h2>
			<p>
				Mantemos seus dados enquanto sua conta estiver ativa. Ao excluir a
				conta, apagamos ou anonimizamos seus dados, exceto:
			</p>
			<ul>
				<li>
					os que formos obrigados a guardar por lei, como registros de acesso,
					pelo prazo legal;
				</li>
				<li>
					os mínimos necessários para impedir o retorno de contas banidas.
				</li>
			</ul>

			<h2>8. Seus direitos</h2>
			<p>
				Nos termos do art. 18 da LGPD, você pode solicitar a qualquer momento,
				pelo e-mail <ContactEmail />:
			</p>
			<ul>
				<li>a confirmação de que tratamos seus dados e o acesso a eles;</li>
				<li>
					a correção de dados incompletos ou incorretos (grande parte você edita
					diretamente no seu perfil);
				</li>
				<li>a exclusão da sua conta e dos seus dados;</li>
				<li>informações sobre com quem compartilhamos seus dados;</li>
				<li>
					a revogação do seu consentimento, quando o tratamento se basear nele.
				</li>
			</ul>
			<p>
				Você também pode apresentar reclamação à Autoridade Nacional de
				Proteção de Dados (ANPD).
			</p>

			<h2>9. Menores de idade</h2>
			<p>
				9.1. A Luna é destinada exclusivamente a maiores de 18 anos. O cadastro
				exige a declaração de maioridade, e a plataforma não é direcionada a
				crianças e adolescentes.
			</p>
			<p>
				9.2. Se tomarmos conhecimento de que uma conta pertence a um menor de
				18 anos, ela poderá ser excluída e os dados associados serão apagados,
				ressalvadas as hipóteses de guarda obrigatória por lei.
			</p>
			<p>
				9.3. O limite de 18 anos existe porque a Luna reúne jogadores de
				títulos com classificação indicativa adulta, como Call of Duty e Red
				Dead, e busca respeitar a proteção de crianças e adolescentes prevista
				no ECA Digital (Lei nº 15.211/2025).
			</p>

			<h2>10. Alterações nesta política</h2>
			<p>
				Podemos atualizar esta Política. Avisaremos sobre mudanças relevantes
				por aviso na plataforma e/ou pelo e-mail cadastrado.
			</p>

			<h2>11. Contato e foro</h2>
			<p>
				Dúvidas ou solicitações: <ContactEmail />. Foro: São Paulo/SP.
			</p>
		</LegalDocument>
	)
}
