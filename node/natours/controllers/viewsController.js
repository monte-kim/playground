export default class ViewsController {
  getOverview = (req, res) => {
    res.status(200).render('overview', {
      title: 'All Tours',
    });
  };

  getTour = (req, res) => {
    res.status(200).render('tour', {
      title: 'The Forest Hiker Tour',
    });
  };
}
