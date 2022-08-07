import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bringAnswers, bringQandA, getProductsById, getQandA } from "../../redux/actions";
import Swal from 'sweetalert2'
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from 'react-i18next';

export default function QuestionForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();
  const [question, setQuestion] = useState({
    title: "",
    description: ""
  })

  // let actualProduct = useSelector(state => state.detail)
  let QandA = useSelector(state => state.infoQuestion)
  let answers = useSelector(state => state.infoAnswer);
  const history = useHistory();
  const { user } = useAuth();

  const qState = QandA;
console.log(QandA)

  useEffect(() => {
    dispatch(getProductsById(params.id))
    dispatch(bringQandA(params.id))
    dispatch(bringAnswers(params.id))
  }, [dispatch, params.id]);

  const handleChange = (e) => {
    e.preventDefault();
    setQuestion({
      ...question,
      [e.target.name]: e.target.value
    })
    // console.log("e.target.value", e.target.value)

  }

  // console.log("question before", question)

  function mapState() {
    var mappedTitle = question.title;
    var mappedDescription = question.description;
    // console.log("maped", mappedTitle, mappedDescription)
    qState.push(mappedTitle)
    qState.push(mappedDescription)

    // console.log("estado de prueba", qState)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    user ? dispatch(getQandA(params.id, question)) : Swal.fire({
      title: t('questionForm.title'),
      text: t('questionForm.text'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: t('questionForm.cancelButtonText'),
      confirmButtonText: t('questionForm.confirmButtonText')
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/login")
      }
    })
    setQuestion({
      title: "",
      description: ""
    })
    dispatch(mapState)
  }

  // console.log("question after", question)

  return (
    <div className="formDiv">
      <Form className="form">
        <Form.Group className="mb-3 formGroup" controlId="Question">
          <Form.Label className="text">{t('questionForm.title')}</Form.Label>
          <Form.Control onChange={e => handleChange(e)} name="title" value={question.title} as="textarea" rows={3} />
          <Form.Label className="text">{t('questionForm.question')}</Form.Label>
          <Form.Control onChange={e => handleChange(e)} name="description" value={question.description} as="textarea" rows={3} />
          <Button onClick={e => handleSubmit(e)} className="btn" size="sm">
            {t('questionForm.makeQuestion')}
          </Button>
        </Form.Group>
      </Form>

      <div>
        <div className="questions">
          <h2 className="titleQuestion">{t('questionForm.alsoAsked')}</h2>
          {
            QandA ? QandA.map((m, index) => {
              return (
                (index % 2) === 0 ? <div className="QandAContainer"><div className="question bubble"><h2>{m}</h2><p>{QandA[index + 1]}</p></div>
                  <div className="answer"><p>{answers[index]}</p></div> </div> : null
              )
            }) : <div className="questionNull">{t('questionForm.noQuestion')}</div>
          }
        </div>
      </div>
    </div>
  )
} // ponerle key al div className="QandAContainer"
