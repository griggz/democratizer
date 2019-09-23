import functools


def trial(max_trial=5):
    """
    Decorator
    Tries maximum of max_trial times to succeed. It will stop if it succeeds.

    use like:
    > @trial(max_trial=10)
    > def function_name(inputs):
    >     # define function normally
    >     return outputs

    Parameters
    ----------
    max_trial : int, optional(5)

    Notes
    -----
    When function fails, it will print error messages.
    If it fails after max_trial number of tries. It will return -1.
    """
    def decorator_trial(func):
        @functools.wraps(func)
        def wrapper_trial(*args, **kwargs):
            for counter in range(max_trial):
                try:
                    return func(*args, **kwargs)
                except BaseException:
                    print('ERROR: cannot load the page!')
                    if counter < max_trial - 1:
                        print('trying again ...')
                    else:
                        print('Error: skipping the page!!!')
            return -1
        return wrapper_trial
    return decorator_trial
