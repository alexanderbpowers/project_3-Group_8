from sklearn.metrics import mean_absolute_error, median_absolute_error

def mean_abs_deviation(y):
    return ((y - y.mean()).apply(abs)).mean()

def median_abs_deviation(y):
    return ((y - y.median()).apply(abs)).median()

def create_metrics(y_test,y_pred):
    ret = {}
    ret['mean abs deviation'] = mean_abs_deviation(y_test)
    ret['mean absolute error'] = mean_absolute_error(y_test, y_pred)
    ret['median abs deviation'] = median_abs_deviation(y_test)
    ret['median absolute error'] = median_absolute_error(y_test,y_pred)
    return ret
