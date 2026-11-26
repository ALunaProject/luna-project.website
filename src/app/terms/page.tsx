import type { Metadata } from "next"
import Link from "next/link"
import LegalDocument, {
	ContactEmail,
} from "@/components/shared/LegalDocument/LegalDocument"

export const metadata: Metadata = {
	title: "Termos de Uso",
	description: "Termos de Uso da plataforma Luna.",
}

export default function TermsPage() {
	return (
		<LegalDocument
			title="Termos de Uso"
			backHref="/signup"
			backLabel="Voltar ao cadastro">
			<p>
				Estes Termos de Uso regem o uso da plataforma Luna, de responsabilidade
				do Grupo LUNA (“Luna”, “nós”). Contato: <ContactEmail />.
			</p>

			<h2>1. Aceitação dos termos</h2>
			<p>
				1.1. Ao criar uma conta ou usar a Luna, você declara que leu, entendeu
				e concorda com estes Termos e com a nossa{" "}
				<Link href="/privacy">Política de Privacidade</Link>. Se não
				concordar, não utilize a plataforma.
			</p>
			<p>
				1.2. No cadastro, o aceite é feito por meio de caixas de confirmação.
				Registramos a versão dos documentos aceita e a data e hora do aceite,
				para fins de comprovação.
			</p>

			<h2>2. Sobre a Luna</h2>
			<p>
				A Luna é uma plataforma social para jogadores, na qual é possível criar
				um perfil, organizar listas de jogos (favoritos, lista de desejos e
				jogando), publicar posts de “Procuro Jogo” (Looking For Game) e
				comentar nas publicações de outros usuários.
			</p>

			<h2>3. Quem pode usar</h2>
			<p>
				3.1. A Luna é destinada exclusivamente a maiores de 18 anos. Ao se
				cadastrar, você declara, marcando a caixa de confirmação, ter pelo
				menos 18 anos.
			</p>
			<p>
				3.2. A idade mínima existe porque a Luna é uma comunidade de jogadores
				que conversa e organiza partidas de jogos com classificação indicativa
				para maiores de 18 anos, como Call of Duty e Red Dead. Restringir o
				acesso a adultos também reduz a exposição de crianças e adolescentes a
				esse tipo de conteúdo, em linha com a proteção prevista na Lei nº
				15.211/2025 (ECA Digital).
			</p>
			<p>
				3.3. Contas de menores de 18 anos poderão ser excluídas sem aviso
				prévio. A exclusão por esse motivo não é uma penalidade de moderação e
				não segue o procedimento do item 7.
			</p>
			<p>
				3.4. A Luna poderá adotar mecanismos adicionais de verificação de
				idade, caso seja necessário ou exigido por lei.
			</p>
			<p>
				3.5. Você deve fornecer informações verdadeiras e mantê-las
				atualizadas.
			</p>

			<h2>4. Sua conta</h2>
			<p>
				4.1. Você é responsável por manter sua senha em sigilo e por tudo o que
				acontece na sua conta.
			</p>
			<p>
				4.2. Avise-nos imediatamente, pelo e-mail <ContactEmail />, se
				suspeitar de acesso não autorizado.
			</p>
			<p>
				4.3. O nome de usuário deve ser único e não pode conter ou fazer
				referência a:
			</p>
			<ul>
				<li>
					(a) ofensas, discriminação, racismo, apologia ao nazismo ou a outros
					crimes de ódio (por exemplo, nomes de figuras históricas associadas a
					genocídio ou expressões racistas);
				</li>
				<li>
					(b) pessoas, marcas ou a equipe da Luna, com a intenção de se passar
					por elas;
				</li>
				<li>
					(c) termos reservados pelo sistema, como nomes de páginas e rotas da
					plataforma.
				</li>
			</ul>
			<p>
				4.4. Nomes de usuário que violem esta regra podem ser removidos, ou a
				conta banida, assim que identificados pela nossa equipe ou denunciados
				por outros usuários.
			</p>

			<h2>5. Conteúdo do usuário</h2>
			<p>
				5.1. Você é o único responsável por tudo o que publica: posts,
				comentários, bio, foto de perfil e banner.
			</p>
			<p>
				5.2. Você mantém seus direitos sobre o conteúdo, mas concede à Luna uma
				licença não exclusiva, gratuita e mundial para armazená-lo e exibi-lo
				na plataforma, exclusivamente para o funcionamento do serviço.
			</p>
			<p>
				5.3. Você declara ter o direito de publicar o que envia. Não publique
				imagens ou textos de terceiros sem autorização.
			</p>
			<p>
				5.4. Imagens de perfil e banner devem respeitar os formatos e o limite
				de tamanho (2 MB) informados na plataforma.
			</p>
			<p>
				5.5. Posts, comentários, bio, foto, banner e nome de usuário podem ser
				vistos por outros usuários. Não publique dados pessoais seus ou de
				terceiros, como telefone, endereço, documentos ou contatos privados,
				em campos públicos.
			</p>

			<h2>6. Condutas proibidas</h2>
			<p>É proibido:</p>
			<ul>
				<li>assediar, ameaçar, discriminar ou praticar discurso de ódio;</li>
				<li>
					publicar conteúdo ilegal, pornográfico, violento ou que viole direitos
					autorais;
				</li>
				<li>fazer spam, propaganda não autorizada ou aplicar golpes;</li>
				<li>
					tentar invadir, sobrecarregar ou explorar falhas da plataforma, ou
					usar bots e scrapers sem autorização;
				</li>
				<li>
					criar contas falsas ou múltiplas contas para burlar punições;
				</li>
				<li>se passar por outra pessoa.</li>
			</ul>

			<h2>7. Moderação e penalidades</h2>
			<p>
				7.1. Qualquer usuário pode denunciar contas, posts e comentários pelo
				sistema de denúncias da plataforma ou pelo e-mail <ContactEmail />.
			</p>
			<p>
				7.2. Quando uma conta recebe um volume relevante de denúncias, ela é
				analisada por um moderador, que decide se houve violação destes
				Termos.
			</p>
			<p>
				7.3. Conforme a gravidade da violação, o moderador poderá aplicar: (a)
				a remoção do conteúdo; (b) um strike na conta; ou (c) o banimento
				imediato, nos casos graves (por exemplo, ameaças, discurso de ódio e
				nomes de usuário proibidos).
			</p>
			<p>7.4. Ao acumular 3 (três) strikes, a conta é banida.</p>
			<p>
				7.5. Você será notificado sobre a penalidade aplicada e poderá
				solicitar a revisão da decisão pelo e-mail <ContactEmail />.
			</p>

			<h2>8. Jogos, marcas e serviços de terceiros</h2>
			<p>
				8.1. Nomes, imagens e avaliações de jogos exibidos na Luna pertencem
				aos seus respectivos titulares e plataformas (como a Steam). A Luna não
				é afiliada a eles.
			</p>
			<p>
				8.2. Não nos responsabilizamos por conteúdos ou serviços de terceiros,
				nem por sua eventual indisponibilidade.
			</p>

			<h2>9. Privacidade e dados pessoais</h2>
			<p>
				O tratamento dos seus dados pessoais é regido pela nossa{" "}
				<Link href="/privacy">Política de Privacidade</Link> e pela Lei Geral
				de Proteção de Dados (Lei nº 13.709/2018). Você pode exercer seus
				direitos de titular pelo e-mail <ContactEmail />.
			</p>

			<h2>10. Limitação de responsabilidade</h2>
			<p>
				10.1. A Luna é oferecida “como está”, sem garantia de funcionamento
				ininterrupto ou livre de erros.
			</p>
			<p>
				10.2. Não nos responsabilizamos pelo conteúdo publicado pelos
				usuários, nem por encontros, negociações ou combinações feitas entre
				eles (como partidas marcadas a partir dos posts “Procuro Jogo”).
			</p>
			<p>
				10.3. Não nos responsabilizamos por perdas decorrentes de
				indisponibilidade, falhas técnicas ou acesso indevido causado por
				descuido do usuário.
			</p>
			<p>
				10.4. Nada nestes Termos afasta responsabilidades que a lei não
				permita limitar, inclusive as previstas no Marco Civil da Internet
				(Lei nº 12.965/2014).
			</p>

			<h2>11. Encerramento da conta</h2>
			<p>
				Você pode excluir sua conta a qualquer momento pelas configurações da
				sua conta ou, se preferir, solicitando pelo e-mail <ContactEmail />.
				Podemos suspender ou encerrar contas nos casos previstos nestes
				Termos.
			</p>

			<h2>12. Alterações nos termos</h2>
			<p>
				12.1. Podemos atualizar estes Termos. Avisaremos sobre mudanças
				relevantes por aviso na plataforma e/ou pelo e-mail cadastrado.
			</p>
			<p>
				12.2. Em caso de mudança relevante, poderemos pedir que você aceite a
				nova versão. Continuar usando a Luna após a atualização significa que
				você concorda com ela.
			</p>

			<h2>13. Lei aplicável e foro</h2>
			<p>
				Estes Termos são regidos pelas leis do Brasil. Fica eleito o foro da
				comarca de São Paulo/SP para resolver eventuais conflitos, ressalvados
				os direitos do consumidor, se aplicáveis.
			</p>

			<h2>14. Contato</h2>
			<p>
				Dúvidas, denúncias ou solicitações: <ContactEmail />.
			</p>
		</LegalDocument>
	)
}
