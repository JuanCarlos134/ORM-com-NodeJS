const { PessoasServices } = require('../services')
const pessoasServices = new PessoasServices()

class PessoaController {
    static async pegaPessoasAtivas(req, res) {
        try {
            const pessoasAtivas = await pessoasServices.pegaRegistrosAtivos();
            return res.status(200).json(pessoasAtivas,);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaTodasAsPessoas(req, res) {
        try {
            const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros();
            return res.status(200).json(todasAsPessoas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaPessoa(req, res) {  
        const { id } = req.params
        try {
          const pessoas = await pessoasServices.pegaUmRegistro({ id })
          return res.status(200).json(pessoas)
        } catch (error) {
          return res.status(500).json(error.message)
        }
      }

    static async criaPessoa(req, res) {
        const novaPessoa = req.body;
        try {
            const novaPessoaCriada = await pessoasServices.criaUmRegistro(novaPessoa);
            return res.status(200).json(novaPessoaCriada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaPessoa(req, res) {  
        const { id } = req.params
        const novasInfos = req.body
        try {
          await pessoasServices.atualizaRegistro(novasInfos, Number(id))
          return res.status(200).json({ mensagem: `id ${id} atualizado` })
        } catch (error) {
          return res.status(500).json(error.message)
        }
      }
    
    static async apagaPessoa(req, res) {
        const { id } = req.params;
        try {
            await pessoasServices.apagaRegistro(Number(id));
            return res.status(200).json({ mensagem: `id: ${id}, foi deletado com sucesso.` });
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    static async restauraPessoa(req, res) {
        const { id } = req.params;
        try {
            await database.Pessoas.restore({ where: { id: Number(id) } })
            return res.status(200).json({ mensagem: ` id ${id} foi restaurado.` })
        } catch (error) {
            return res.status(200).json(error.message);
        }
    }

    static async cancelaPessoa(req, res) {  
        const { estudanteId } = req.params
        try {
          await pessoasServices.cancelaPessoaEMatriculas(Number(estudanteId))
          return res
            .status(200)
            .json({message: `matrículas ref. estudante ${estudanteId} canceladas`}) 
        } catch (error) {
          return res.status(500).json(error.message)
        }
      }
    }

module.exports = PessoaController;